import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '@environments/environment';
import { ApiResponse } from '../models/api-response.model';
import { PaymentResponse, PayPalOrderResponse, Voucher } from '../models/payment.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private readonly apiUrl = `${environment.apiUrl}/payments`;

  constructor(private readonly http: HttpClient) {}

  createPayPalOrder(orderId: string, amount: number, currency: string = 'USD'): Observable<PayPalOrderResponse> {
    return this.http.post<ApiResponse<PayPalOrderResponse>>(`${this.apiUrl}/paypal/create-order`, {
      orderId,
      amount,
      currency
    }).pipe(map(response => response.data));
  }

  capturePayPalOrder(payPalOrderId: string): Observable<PaymentResponse> {
    return this.http.post<ApiResponse<PaymentResponse>>(`${this.apiUrl}/paypal/capture-order`, {
      payPalOrderId
    }).pipe(map(response => response.data));
  }

  getPayment(id: string): Observable<PaymentResponse> {
    return this.http.get<ApiResponse<PaymentResponse>>(`${this.apiUrl}/${id}`)
      .pipe(map(response => response.data));
  }

  getPaymentByOrder(orderId: string): Observable<PaymentResponse> {
    return this.http.get<ApiResponse<PaymentResponse>>(`${this.apiUrl}/order/${orderId}`)
      .pipe(map(response => response.data));
  }

  getVouchersForOrder(orderId: string): Observable<Voucher[]> {
    return this.http.get<ApiResponse<Voucher[]>>(`${this.apiUrl}/vouchers/order/${orderId}`)
      .pipe(map(response => response.data));
  }
}
