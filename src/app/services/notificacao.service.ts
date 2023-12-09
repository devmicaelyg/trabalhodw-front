import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {

  constructor() { }

  alert(mensagem: string, sucesso: boolean ) {
    Swal.fire({
      position: "top-end",
      icon: sucesso ? "success" : "error",
      title: mensagem,
      showConfirmButton: false,
      timer: 1500
    })
  }
}
