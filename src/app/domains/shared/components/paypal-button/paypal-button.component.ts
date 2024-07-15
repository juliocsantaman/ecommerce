import { Component, OnInit, AfterViewInit, inject } from '@angular/core';
import { CartService } from '@shared/services/cart-service/cart.service';

declare var paypal: any;

@Component({
  selector: 'app-paypal-button',
  standalone: true,
  imports: [],
  templateUrl: './paypal-button.component.html',
  styleUrl: './paypal-button.component.scss'
})
export class PaypalButtonComponent implements OnInit, AfterViewInit {

  private cartService = inject(CartService);

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    paypal.Buttons({
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [{
            amount: {
              value: this.cartService.cartTotal() // Monto a pagar
            }
          }]
        });
      },
      onApprove: (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
          alert('Pago completado por ' + details.payer.name.given_name);
          console.group('onApprove');
          console.log('details', details);
          console.groupEnd();
          this.cartService.initialCart();
          // Aquí puedes enviar los detalles del pago a tu servidor si lo necesitas
        });
      }
    }).render('#paypal-button-container'); // Renderiza el botón de PayPal en el contenedor
  }


}
