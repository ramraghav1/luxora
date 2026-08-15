import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '@environments/environment';

const API_ORIGIN = environment.apiUrl.replace(/\/api\/?$/, '');

/** Resolves API-relative image paths (e.g. "/uploads/...") to absolute URLs against the API origin. */
@Pipe({
  name: 'resolveImageUrl',
  standalone: true
})
export class ResolveImageUrlPipe implements PipeTransform {
  transform(url: string | null | undefined): string | null | undefined {
    if (!url || /^(https?:)?\/\//i.test(url)) {
      return url;
    }
    return `${API_ORIGIN}${url.startsWith('/') ? '' : '/'}${url}`;
  }
}
