import { Component, EventEmitter, Input, Output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ProductService } from '../../../features/products/product.service';

/**
 * Reusable image input supporting drag & drop / click-to-browse device uploads
 * as well as manual URL entry. Emits the resulting absolute-or-relative URL(s)
 * via `uploaded` regardless of which method was used.
 */
@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="image-uploader">
      <div
        class="image-uploader__dropzone"
        [class.image-uploader__dropzone--dragover]="isDragOver()"
        [class.image-uploader__dropzone--busy]="uploading()"
        (dragover)="onDragOver($event)"
        (dragleave)="onDragLeave($event)"
        (drop)="onDrop($event)"
        (click)="!uploading() && fileInput.click()"
      >
        <input
          #fileInput
          type="file"
          accept="image/*"
          [multiple]="multiple"
          hidden
          (change)="onFileSelected($event)"
        >
        @if (uploading()) {
          <svg class="spin" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
          <span>{{ progressText() }}</span>
        } @else {
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17,8 12,3 7,8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
          <span>Drag &amp; drop {{ multiple ? 'images' : 'an image' }} here, or click to browse</span>
          <span class="image-uploader__hint">JPG, PNG, WEBP or GIF up to 5MB{{ multiple ? ' each' : '' }}</span>
        }
      </div>

      @if (errorMessage()) {
        <span class="image-uploader__error">{{ errorMessage() }}</span>
      }

      <div class="image-uploader__url-row">
        <span class="image-uploader__divider">or</span>
        <input
          type="text"
          placeholder="Paste an image URL"
          [(ngModel)]="urlInput"
          (keydown.enter)="$event.preventDefault(); addUrl()"
        >
        <button type="button" (click)="addUrl()">Add</button>
      </div>
    </div>
  `,
  styles: [`
    .image-uploader { display: flex; flex-direction: column; gap: 0.5rem; }

    .image-uploader__dropzone {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      gap: 0.35rem; text-align: center; padding: 1.25rem 1rem; cursor: pointer;
      border: 1.5px dashed var(--border); border-radius: var(--radius-md);
      background: var(--content-bg); color: var(--text-muted); font-size: 0.8rem;
      transition: border-color 0.15s, background 0.15s, color 0.15s;
    }
    .image-uploader__dropzone:hover { border-color: var(--accent); color: var(--accent); }
    .image-uploader__dropzone--dragover { border-color: var(--accent); background: color-mix(in srgb, var(--accent) 8%, transparent); color: var(--accent); }
    .image-uploader__dropzone--busy { cursor: wait; }
    .image-uploader__hint { font-size: 0.7rem; opacity: 0.75; }

    .spin { animation: spin 1s linear infinite; }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

    .image-uploader__error {
      font-size: 0.75rem; color: var(--error, #ef4444); font-weight: 500;
    }

    .image-uploader__url-row {
      display: flex; align-items: center; gap: 0.5rem;
    }
    .image-uploader__divider { font-size: 0.72rem; color: var(--text-muted); }
    .image-uploader__url-row input {
      flex: 1; min-width: 0; padding: 0.45rem 0.6rem; font-size: 0.78rem;
      border: 1.5px solid var(--border); border-radius: var(--radius-sm);
      background: var(--surface); color: var(--text-primary); outline: none;
    }
    .image-uploader__url-row input:focus { border-color: var(--accent); }
    .image-uploader__url-row button {
      padding: 0.45rem 0.8rem; font-size: 0.75rem; font-weight: 600;
      border: 1.5px solid var(--border); border-radius: var(--radius-sm);
      background: var(--surface); color: var(--text-secondary); cursor: pointer;
    }
    .image-uploader__url-row button:hover { border-color: var(--accent); color: var(--accent); }
  `]
})
export class ImageUploaderComponent {
  private productService = inject(ProductService);

  /** Allow selecting/dropping more than one file at once. */
  @Input() multiple = false;
  @Input() maxSizeBytes = 5 * 1024 * 1024;

  /** Emits one or more resulting URLs, from either an upload or manual URL entry. */
  @Output() uploaded = new EventEmitter<string[]>();

  isDragOver = signal(false);
  uploading = signal(false);
  progressText = signal('');
  errorMessage = signal('');
  urlInput = '';

  onDragOver(event: DragEvent) {
    event.preventDefault();
    if (!this.uploading()) this.isDragOver.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragOver.set(false);
    if (this.uploading() || !event.dataTransfer?.files?.length) return;
    this.handleFiles(event.dataTransfer.files);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) this.handleFiles(input.files);
    input.value = '';
  }

  private handleFiles(fileList: FileList) {
    const files = Array.from(fileList).slice(0, this.multiple ? fileList.length : 1);
    const validFiles: File[] = [];

    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        this.errorMessage.set(`"${file.name}" is not a supported image type.`);
        continue;
      }
      if (file.size > this.maxSizeBytes) {
        this.errorMessage.set(`"${file.name}" exceeds the ${this.maxSizeBytes / (1024 * 1024)}MB limit.`);
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    this.errorMessage.set('');
    this.uploading.set(true);
    this.progressText.set(`Uploading ${validFiles.length} image${validFiles.length > 1 ? 's' : ''}...`);

    forkJoin(validFiles.map(file => this.productService.uploadImage(file))).subscribe({
      next: (results) => {
        this.uploading.set(false);
        this.uploaded.emit(results.map(r => r.data.url));
      },
      error: (err) => {
        this.uploading.set(false);
        this.errorMessage.set(err?.error?.message || 'Failed to upload one or more images. Please try again.');
      }
    });
  }

  addUrl() {
    const url = this.urlInput.trim();
    if (!url) return;
    this.errorMessage.set('');
    this.uploaded.emit([url]);
    this.urlInput = '';
  }
}
