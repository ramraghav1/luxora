export interface PaymentResponse {
  id: string;
  orderId: string;
  amount: number;
  currency: string;
  method: string;
  status: string;
  transactionId?: string;
  payPalOrderId?: string;
  payerEmail?: string;
  failureReason?: string;
  paidAt?: string;
  refundedAmount?: number;
  refundedAt?: string;
  createdAt: string;
  transactions: PaymentTransaction[];
}

export interface PaymentTransaction {
  id: string;
  eventType: string;
  description: string;
  occurredAt: string;
}

export interface PayPalOrderResponse {
  payPalOrderId: string;
  approvalUrl: string;
  paymentId: string;
}

export interface Voucher {
  id: string;
  voucherNumber: string;
  paymentId: string;
  orderId: string;
  amount: number;
  currency: string;
  customerEmail: string;
  description: string;
  type: string;
  issuedAt: string;
}
