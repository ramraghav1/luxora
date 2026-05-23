import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ProductService, ProductDto, CategoryDto, ProductStatus, MediaType,
  CreateProductRequest, MediaRequest, AttributeRequest, VariantRequest
} from './product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="products">
      <div class="products__header">
        <div>
          <h1 class="products__title">{{ isEditMode() ? 'Edit Product' : 'New Product' }}</h1>
          <p class="products__subtitle">
            @if (isEditMode()) {
              Editing "{{ originalProduct()?.name }}"
            } @else {
              Fill in the details to add a new product
            }
          </p>
        </div>
        <div class="products__actions">
          <button class="btn btn--outline btn--sm" (click)="cancel()">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
            Cancel
          </button>
          <button class="btn btn--primary btn--sm" (click)="save()" [disabled]="saving()">
            @if (saving()) {
              <svg class="spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
              Saving...
            } @else {
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z"/><polyline points="17,21 17,13 7,13 7,21"/><polyline points="7,3 7,8 15,8"/></svg>
              {{ isEditMode() ? 'Update' : 'Create' }}
            }
          </button>
        </div>
      </div>

      @if (errorMessage()) {
        <div class="alert alert--error">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
          <span>{{ errorMessage() }}</span>
          <button class="alert__close" (click)="errorMessage.set('')">&times;</button>
        </div>
      }

      @if (loading()) {
        <div class="loading-state">
          <svg class="spin" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
          <span>Loading product...</span>
        </div>
      } @else {
        <form [formGroup]="form" class="form-layout">
          <div class="form-layout__grid">
            <!-- LEFT COLUMN -->
            <div class="form-layout__main">
              <!-- Basic Info -->
              <div class="card">
                <div class="card__header"><h3 class="card__title">Basic Information</h3></div>
                <div class="card__body card__body--padded">
                  <div class="form-field">
                    <label class="form-field__label">Product Name <span class="required">*</span></label>
                    <input class="form-field__input" type="text" formControlName="name" placeholder="e.g. Premium Leather Jacket">
                    @if (form.get('name')?.touched && form.get('name')?.invalid) {
                      <span class="form-field__error">Product name is required</span>
                    }
                  </div>
                  <div class="form-field">
                    <label class="form-field__label">Short Description <span class="required">*</span></label>
                    <input class="form-field__input" type="text" formControlName="shortDescription" placeholder="Brief one-line summary" maxlength="500">
                    @if (form.get('shortDescription')?.touched && form.get('shortDescription')?.invalid) {
                      <span class="form-field__error">Short description is required</span>
                    }
                  </div>
                  <div class="form-field">
                    <label class="form-field__label">Description <span class="required">*</span></label>
                    <textarea class="form-field__input form-field__input--textarea" formControlName="description" rows="5" placeholder="Full product description..."></textarea>
                    @if (form.get('description')?.touched && form.get('description')?.invalid) {
                      <span class="form-field__error">Description is required</span>
                    }
                  </div>
                  <div class="form-field__row">
                    <div class="form-field">
                      <label class="form-field__label">SKU <span class="required">*</span></label>
                      <input class="form-field__input" type="text" formControlName="sku" placeholder="SKU-001">
                      @if (form.get('sku')?.touched && form.get('sku')?.invalid) {
                        <span class="form-field__error">SKU is required</span>
                      }
                    </div>
                    <div class="form-field">
                      <label class="form-field__label">Brand</label>
                      <input class="form-field__input" type="text" formControlName="brand" placeholder="Brand name">
                    </div>
                  </div>
                  <div class="form-field">
                    <label class="form-field__label">Tags</label>
                    <input class="form-field__input" type="text" formControlName="tags" placeholder="leather, premium, winter (comma-separated)">
                  </div>
                </div>
              </div>

              <!-- Pricing -->
              <div class="card">
                <div class="card__header"><h3 class="card__title">Pricing</h3></div>
                <div class="card__body card__body--padded">
                  <div class="form-field__row form-field__row--3">
                    <div class="form-field">
                      <label class="form-field__label">Price <span class="required">*</span></label>
                      <div class="form-field__prefix-wrap">
                        <span class="form-field__prefix">$</span>
                        <input class="form-field__input form-field__input--prefixed" type="number" formControlName="price" step="0.01" min="0.01">
                      </div>
                      @if (form.get('price')?.touched && form.get('price')?.invalid) {
                        <span class="form-field__error">Price must be greater than 0</span>
                      }
                    </div>
                    <div class="form-field">
                      <label class="form-field__label">Compare At</label>
                      <div class="form-field__prefix-wrap">
                        <span class="form-field__prefix">$</span>
                        <input class="form-field__input form-field__input--prefixed" type="number" formControlName="compareAtPrice" step="0.01" min="0">
                      </div>
                    </div>
                    <div class="form-field">
                      <label class="form-field__label">Sale Price</label>
                      <div class="form-field__prefix-wrap">
                        <span class="form-field__prefix">$</span>
                        <input class="form-field__input form-field__input--prefixed" type="number" formControlName="salePrice" step="0.01" min="0">
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Media Gallery -->
              <div class="card">
                <div class="card__header">
                  <h3 class="card__title">Media Gallery</h3>
                  <button type="button" class="btn btn--ghost btn--xs" (click)="addMedia()">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    Add
                  </button>
                </div>
                <div class="card__body card__body--padded">
                  @if (mediaControls.length === 0) {
                    <div class="empty-placeholder" (click)="addMedia()">
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>
                      <span>Click to add images or videos</span>
                    </div>
                  }
                  <div class="media-grid">
                    @for (media of mediaControls.controls; track $index) {
                      <div class="media-card" [class.media-card--primary]="media.get('isPrimary')?.value">
                        <div class="media-card__preview">
                          @if (media.get('type')?.value == 0) {
                            <img [src]="media.get('url')?.value || 'https://placehold.co/200x200/f8f9fa/adb5bd?text=Image'" alt="Media">
                          } @else {
                            <div class="media-card__video">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>
                            </div>
                          }
                          @if (media.get('isPrimary')?.value) {
                            <span class="media-card__badge">Primary</span>
                          }
                          <div class="media-card__overlay">
                            <button type="button" class="media-card__action" (click)="setPrimaryMedia($index)" title="Set as primary">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
                            </button>
                            <button type="button" class="media-card__action media-card__action--danger" (click)="removeMedia($index)" title="Remove">
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3,6 5,6 21,6"/><path d="M19,6v14a2 2 0 01-2,2H7a2 2 0 01-2-2V6m3,0V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
                            </button>
                          </div>
                        </div>
                        <div class="media-card__fields">
                          <input class="form-field__input form-field__input--sm" type="text" [formControl]="$any(media.get('url'))" placeholder="URL">
                          <div class="media-card__row">
                            <select class="form-field__input form-field__input--sm" [formControl]="$any(media.get('type'))">
                              <option [value]="0">Image</option>
                              <option [value]="1">Video</option>
                            </select>
                            <input class="form-field__input form-field__input--sm" type="text" [formControl]="$any(media.get('altText'))" placeholder="Alt text">
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                </div>
              </div>

              <!-- Attributes -->
              <div class="card">
                <div class="card__header">
                  <h3 class="card__title">Attributes</h3>
                  <button type="button" class="btn btn--ghost btn--xs" (click)="addAttribute()">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    Add
                  </button>
                </div>
                <div class="card__body card__body--padded">
                  @if (attributeControls.length === 0) {
                    <p class="empty-text">No attributes yet. Add attributes like Material, Weight, Color, etc.</p>
                  }
                  <div class="attr-list">
                    @for (attr of attributeControls.controls; track $index) {
                      <div class="attr-item">
                        <input class="form-field__input form-field__input--sm" type="text" [formControl]="$any(attr.get('name'))" placeholder="Name">
                        <input class="form-field__input form-field__input--sm" type="text" [formControl]="$any(attr.get('value'))" placeholder="Value">
                        <button type="button" class="icon-btn icon-btn--danger" (click)="removeAttribute($index)">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                      </div>
                    }
                  </div>
                </div>
              </div>
            </div>

            <!-- RIGHT COLUMN -->
            <div class="form-layout__aside">
              <!-- Status -->
              <div class="card">
                <div class="card__header"><h3 class="card__title">Status</h3></div>
                <div class="card__body card__body--padded">
                  <div class="form-field">
                    <label class="form-field__label">Product Status</label>
                    <select class="form-field__input" formControlName="status">
                      <option [value]="0">Draft</option>
                      <option [value]="1">Active</option>
                      <option [value]="2">On Sale</option>
                      <option [value]="3">Out of Stock</option>
                      <option [value]="4">Discontinued</option>
                    </select>
                  </div>
                  <div class="form-field">
                    <label class="form-field__label">Category <span class="required">*</span></label>
                    <select class="form-field__input" formControlName="categoryId">
                      <option value="">Select category</option>
                      @for (cat of categories(); track cat.id) {
                        <option [value]="cat.id">{{ cat.name }}</option>
                      }
                    </select>
                    @if (form.get('categoryId')?.touched && form.get('categoryId')?.invalid) {
                      <span class="form-field__error">Category is required</span>
                    }
                  </div>
                  <label class="toggle-field">
                    <input type="checkbox" formControlName="isFeatured">
                    <span class="toggle-field__label">Featured Product</span>
                  </label>
                </div>
              </div>

              <!-- Cover Image -->
              <div class="card">
                <div class="card__header"><h3 class="card__title">Cover Image</h3></div>
                <div class="card__body card__body--padded">
                  <div class="form-field">
                    <input class="form-field__input" type="text" formControlName="mainImageUrl" placeholder="Paste image URL here...">
                  </div>
                  @if (form.get('mainImageUrl')?.value) {
                    <div class="cover-preview">
                      <img [src]="form.get('mainImageUrl')?.value" alt="Cover">
                    </div>
                  } @else {
                    <div class="cover-preview cover-preview--empty">
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>
                    </div>
                  }
                </div>
              </div>

              <!-- Variants -->
              <div class="card">
                <div class="card__header">
                  <h3 class="card__title">Color Variants</h3>
                  <button type="button" class="btn btn--ghost btn--xs" (click)="addVariant()">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                    Add
                  </button>
                </div>
                <div class="card__body card__body--padded">
                  @if (variantControls.length === 0) {
                    <p class="empty-text">Link other products as color options</p>
                  }
                  <div class="variant-list">
                    @for (variant of variantControls.controls; track $index) {
                      <div class="variant-item">
                        <input type="color" [formControl]="$any(variant.get('colorHex'))" class="variant-item__swatch">
                        <div class="variant-item__fields">
                          <input class="form-field__input form-field__input--sm" type="text" [formControl]="$any(variant.get('colorName'))" placeholder="Color name">
                          <select class="form-field__input form-field__input--sm" [formControl]="$any(variant.get('productId'))">
                            <option value="">Link product...</option>
                            @for (p of allProducts(); track p.id) {
                              @if (p.id !== originalProduct()?.id) {
                                <option [value]="p.id">{{ p.name }}</option>
                              }
                            }
                          </select>
                        </div>
                        <button type="button" class="icon-btn icon-btn--danger" (click)="removeVariant($index)">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                        </button>
                      </div>
                    }
                  </div>
                </div>
              </div>

              <!-- SEO -->
              <div class="card">
                <div class="card__header"><h3 class="card__title">SEO</h3></div>
                <div class="card__body card__body--padded">
                  <div class="form-field">
                    <label class="form-field__label">Meta Title</label>
                    <input class="form-field__input" type="text" formControlName="metaTitle" placeholder="SEO page title">
                  </div>
                  <div class="form-field">
                    <label class="form-field__label">Meta Description</label>
                    <textarea class="form-field__input form-field__input--textarea" formControlName="metaDescription" rows="2" placeholder="SEO description"></textarea>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      }
    </div>
  `,
  styles: [`
    .products__header {
      display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.5rem;
    }
    .products__title {
      font-family: 'Playfair Display', Georgia, serif; font-size: 1.5rem;
      font-weight: 600; color: var(--text-primary); margin: 0;
    }
    .products__subtitle { font-size: 0.85rem; color: var(--text-muted); margin-top: 0.25rem; }
    .products__actions { display: flex; gap: 0.5rem; }

    .btn {
      display: inline-flex; align-items: center; gap: 0.4rem;
      padding: 0.6rem 1.2rem; border: none; border-radius: var(--radius-sm);
      font-size: 0.8rem; font-weight: 600; cursor: pointer; transition: all 0.2s; white-space: nowrap;
    }
    .btn--primary { background: var(--sidebar-bg); color: #fff; &:hover { opacity: 0.9; } &:disabled { opacity: 0.5; cursor: not-allowed; } }
    .btn--outline { background: var(--surface); color: var(--text-secondary); border: 1.5px solid var(--border); &:hover { border-color: var(--accent); color: var(--accent); } }
    .btn--ghost { background: transparent; color: var(--accent); padding: 0.3rem 0.6rem; &:hover { background: var(--content-bg); } }
    .btn--sm { padding: 0.5rem 1rem; font-size: 0.78rem; }
    .btn--xs { padding: 0.35rem 0.75rem; font-size: 0.75rem; }

    .icon-btn {
      width: 30px; height: 30px; display: inline-flex; align-items: center; justify-content: center;
      border: none; background: transparent; border-radius: var(--radius-sm);
      color: var(--text-muted); cursor: pointer; transition: all 0.15s;
      &:hover { background: var(--content-bg); color: var(--text-primary); }
    }
    .icon-btn--danger:hover { background: var(--error-bg, #fef2f2); color: var(--error, #ef4444); }

    .alert {
      display: flex; align-items: center; gap: 0.6rem; padding: 0.75rem 1rem;
      border-radius: var(--radius-md); margin-bottom: 1rem; font-size: 0.82rem; font-weight: 500;
    }
    .alert--error {
      background: var(--error-bg, #fef2f2); color: var(--error, #ef4444);
      border: 1px solid color-mix(in srgb, var(--error, #ef4444) 20%, transparent);
    }
    .alert__close {
      margin-left: auto; background: none; border: none; font-size: 1.2rem;
      color: inherit; cursor: pointer; line-height: 1; padding: 0 0.25rem;
    }

    .spin { animation: spin 1s linear infinite; }
    @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

    .loading-state {
      display: flex; align-items: center; justify-content: center; gap: 0.75rem;
      padding: 4rem; color: var(--text-muted); font-size: 0.85rem;
    }

    .card {
      background: var(--surface); border-radius: var(--radius-lg);
      border: 1px solid var(--border); overflow: hidden; transition: background 0.3s, border-color 0.3s;
    }
    .card__header {
      display: flex; justify-content: space-between; align-items: center;
      padding: 1rem 1.25rem; border-bottom: 1px solid var(--border-light);
    }
    .card__title { font-size: 0.9rem; font-weight: 600; color: var(--text-primary); margin: 0; }
    .card__body { padding: 0; }
    .card__body--padded { padding: 1.25rem; }

    .form-layout__grid { display: grid; grid-template-columns: 1fr 340px; gap: 1.25rem; align-items: start; }
    .form-layout__main { display: flex; flex-direction: column; gap: 1.25rem; }
    .form-layout__aside { display: flex; flex-direction: column; gap: 1.25rem; }

    .form-field { margin-bottom: 0.85rem; }
    .form-field:last-child { margin-bottom: 0; }
    .form-field__label {
      display: block; font-size: 0.75rem; font-weight: 600; color: var(--text-muted);
      margin-bottom: 0.4rem; text-transform: uppercase; letter-spacing: 0.03em;
    }
    .required { color: var(--error, #ef4444); }
    .form-field__input {
      width: 100%; padding: 0.55rem 0.85rem; border: 1.5px solid var(--border);
      border-radius: var(--radius-sm); font-size: 0.82rem; background: var(--surface);
      color: var(--text-primary); transition: border-color 0.2s, box-shadow 0.2s; outline: none;
      &:focus { border-color: var(--accent); box-shadow: 0 0 0 3px rgba(201, 169, 110, 0.1); }
      &::placeholder { color: var(--text-muted); }
    }
    .form-field__input--textarea { resize: vertical; min-height: 80px; line-height: 1.5; }
    .form-field__input--sm { padding: 0.4rem 0.65rem; font-size: 0.78rem; }
    .form-field__input--prefixed { padding-left: 1.8rem; }
    .form-field__prefix-wrap { position: relative; }
    .form-field__prefix {
      position: absolute; left: 0.75rem; top: 50%; transform: translateY(-50%);
      color: var(--text-muted); font-size: 0.82rem; font-weight: 600;
    }
    .form-field__error { font-size: 0.7rem; color: var(--error, #ef4444); margin-top: 0.25rem; display: block; }
    .form-field__row { display: flex; gap: 0.85rem; }
    .form-field__row .form-field { flex: 1; }
    .form-field__row--3 .form-field { flex: 1; }

    .toggle-field {
      display: flex; align-items: center; gap: 0.6rem; cursor: pointer; padding: 0.5rem 0;
    }
    .toggle-field input[type="checkbox"] { width: 16px; height: 16px; accent-color: var(--accent); cursor: pointer; }
    .toggle-field__label { font-size: 0.82rem; color: var(--text-secondary); font-weight: 500; }

    .media-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 0.85rem; }
    .media-card {
      border: 1.5px solid var(--border); border-radius: var(--radius-md); overflow: hidden; transition: border-color 0.2s;
    }
    .media-card--primary { border-color: var(--accent); }
    .media-card__preview {
      position: relative; height: 130px; background: var(--content-bg); overflow: hidden;
    }
    .media-card__preview img { width: 100%; height: 100%; object-fit: cover; }
    .media-card__video {
      width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
      background: var(--sidebar-bg); color: rgba(255,255,255,0.8);
    }
    .media-card__badge {
      position: absolute; top: 6px; left: 6px; background: var(--accent); color: white;
      font-size: 0.6rem; font-weight: 700; padding: 2px 6px; border-radius: 3px; text-transform: uppercase;
    }
    .media-card__overlay {
      position: absolute; top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center;
      gap: 0.5rem; opacity: 0; transition: opacity 0.2s;
    }
    .media-card:hover .media-card__overlay { opacity: 1; }
    .media-card__action {
      width: 30px; height: 30px; border: none; border-radius: 50%; background: rgba(255,255,255,0.9);
      color: var(--text-primary); cursor: pointer; display: flex; align-items: center; justify-content: center;
      transition: transform 0.15s; &:hover { transform: scale(1.1); }
    }
    .media-card__action--danger:hover { background: var(--error, #ef4444); color: white; }
    .media-card__fields { padding: 0.6rem; display: flex; flex-direction: column; gap: 0.4rem; }
    .media-card__row { display: flex; gap: 0.4rem; }
    .media-card__row select { width: 80px; flex-shrink: 0; }
    .media-card__row input { flex: 1; }

    .empty-placeholder {
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      padding: 2rem; border: 2px dashed var(--border); border-radius: var(--radius-md);
      color: var(--text-muted); cursor: pointer; transition: border-color 0.2s, color 0.2s; gap: 0.5rem;
      &:hover { border-color: var(--accent); color: var(--accent); }
      span { font-size: 0.8rem; font-weight: 500; }
    }
    .empty-text { font-size: 0.78rem; color: var(--text-muted); margin: 0; }

    .attr-list { display: flex; flex-direction: column; gap: 0.5rem; }
    .attr-item { display: flex; gap: 0.5rem; align-items: center; }
    .attr-item input { flex: 1; }

    .variant-list { display: flex; flex-direction: column; gap: 0.65rem; }
    .variant-item { display: flex; gap: 0.5rem; align-items: center; }
    .variant-item__swatch {
      width: 32px; height: 32px; border: 2px solid var(--border);
      border-radius: var(--radius-sm); cursor: pointer; padding: 0; flex-shrink: 0;
    }
    .variant-item__fields { flex: 1; display: flex; flex-direction: column; gap: 0.35rem; }

    .cover-preview { border-radius: var(--radius-md); overflow: hidden; margin-top: 0.5rem; }
    .cover-preview img { width: 100%; height: 160px; object-fit: cover; display: block; }
    .cover-preview--empty {
      height: 120px; background: var(--content-bg);
      display: flex; align-items: center; justify-content: center; color: var(--text-muted);
    }

    @media (max-width: 1100px) { .form-layout__grid { grid-template-columns: 1fr; } }
    @media (max-width: 768px) { .media-grid { grid-template-columns: 1fr; } .form-field__row { flex-direction: column; } }
  `]
})
export class ProductFormComponent implements OnInit {
  private productService = inject(ProductService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isEditMode = signal(false);
  loading = signal(false);
  saving = signal(false);
  errorMessage = signal('');
  originalProduct = signal<ProductDto | null>(null);
  categories = signal<CategoryDto[]>([]);
  allProducts = signal<ProductDto[]>([]);

  form!: FormGroup;

  get mediaControls(): FormArray { return this.form.get('media') as FormArray; }
  get attributeControls(): FormArray { return this.form.get('attributes') as FormArray; }
  get variantControls(): FormArray { return this.form.get('variants') as FormArray; }

  ngOnInit() {
    this.initForm();
    this.loadCategories();
    this.loadAllProducts();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode.set(true);
      this.loading.set(true);
      this.loadProduct(id);
    }
  }

  private initForm() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(200)]],
      shortDescription: ['', [Validators.required, Validators.maxLength(500)]],
      description: ['', Validators.required],
      sku: ['', [Validators.required, Validators.maxLength(50)]],
      brand: [''],
      tags: [''],
      price: [null, [Validators.required, Validators.min(0.01)]],
      compareAtPrice: [null],
      salePrice: [null],
      categoryId: ['', Validators.required],
      status: [ProductStatus.Draft],
      isFeatured: [false],
      mainImageUrl: [''],
      metaTitle: [''],
      metaDescription: [''],
      media: this.fb.array([]),
      attributes: this.fb.array([]),
      variants: this.fb.array([])
    });
  }

  private loadProduct(id: string) {
    this.productService.getProduct(id).subscribe({
      next: (res) => {
        const p = res.data;
        this.originalProduct.set(p);
        this.form.patchValue({
          name: p.name,
          shortDescription: p.shortDescription,
          description: p.description,
          sku: p.sku,
          brand: p.brand,
          tags: p.tags,
          price: p.price,
          compareAtPrice: p.compareAtPrice,
          salePrice: p.salePrice,
          categoryId: p.categoryId,
          status: p.status,
          isFeatured: p.isFeatured,
          mainImageUrl: p.mainImageUrl
        });

        p.media.forEach(m => {
          this.mediaControls.push(this.fb.group({
            url: [m.url], type: [m.type], altText: [m.altText || ''],
            thumbnailUrl: [m.thumbnailUrl || ''], sortOrder: [m.sortOrder], isPrimary: [m.isPrimary]
          }));
        });

        p.attributes.forEach(a => {
          this.attributeControls.push(this.fb.group({ name: [a.name], value: [a.value] }));
        });

        p.variants.forEach(v => {
          this.variantControls.push(this.fb.group({
            productId: [v.productId], colorName: [v.colorName], colorHex: [v.colorHex], sortOrder: [v.sortOrder]
          }));
        });

        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.router.navigate(['/products']);
      }
    });
  }

  private loadCategories() {
    this.productService.getCategories().subscribe({
      next: (res) => this.categories.set(res.data)
    });
  }

  private loadAllProducts() {
    this.productService.getProducts({ pageSize: 200 }).subscribe({
      next: (res) => this.allProducts.set(res.data.items)
    });
  }

  cancel() {
    this.router.navigate(['/products']);
  }

  save() {
    this.errorMessage.set('');
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.errorMessage.set('Please fill in all required fields correctly.');
      return;
    }

    this.saving.set(true);
    const val = this.form.value;

    const request: CreateProductRequest = {
      name: val.name,
      description: val.description,
      shortDescription: val.shortDescription,
      price: val.price,
      compareAtPrice: val.compareAtPrice || undefined,
      salePrice: val.salePrice || undefined,
      sku: val.sku,
      categoryId: val.categoryId,
      mainImageUrl: val.mainImageUrl || undefined,
      isFeatured: val.isFeatured,
      tags: val.tags || undefined,
      brand: val.brand || undefined,
      status: parseInt(val.status),
      media: (val.media || []).map((m: any, i: number): MediaRequest => ({
        url: m.url, type: parseInt(m.type), altText: m.altText || undefined,
        thumbnailUrl: m.thumbnailUrl || undefined, sortOrder: i, isPrimary: m.isPrimary
      })),
      attributes: (val.attributes || []).map((a: any): AttributeRequest => ({ name: a.name, value: a.value })),
      variants: (val.variants || []).filter((v: any) => v.productId).map((v: any, i: number): VariantRequest => ({
        productId: v.productId, colorName: v.colorName, colorHex: v.colorHex, sortOrder: i
      }))
    };

    const obs = this.isEditMode()
      ? this.productService.updateProduct(this.originalProduct()!.id, request)
      : this.productService.createProduct(request);

    obs.subscribe({
      next: () => {
        this.saving.set(false);
        this.router.navigate(['/products']);
      },
      error: (err) => {
        this.saving.set(false);
        const msg = err?.error?.message || err?.message || 'Failed to save product. Please try again.';
        this.errorMessage.set(msg);
      }
    });
  }

  // Media
  addMedia() {
    this.mediaControls.push(this.fb.group({
      url: [''], type: [MediaType.Image], altText: [''], thumbnailUrl: [''],
      sortOrder: [this.mediaControls.length], isPrimary: [this.mediaControls.length === 0]
    }));
  }

  removeMedia(index: number) { this.mediaControls.removeAt(index); }

  setPrimaryMedia(index: number) {
    this.mediaControls.controls.forEach((ctrl, i) => ctrl.get('isPrimary')?.setValue(i === index));
  }

  // Attributes
  addAttribute() { this.attributeControls.push(this.fb.group({ name: [''], value: [''] })); }
  removeAttribute(index: number) { this.attributeControls.removeAt(index); }

  // Variants
  addVariant() {
    this.variantControls.push(this.fb.group({
      productId: [''], colorName: [''], colorHex: ['#000000'], sortOrder: [this.variantControls.length]
    }));
  }
  removeVariant(index: number) { this.variantControls.removeAt(index); }
}
