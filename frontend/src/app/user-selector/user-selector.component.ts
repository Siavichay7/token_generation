import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-user-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="user-selector">
      <select [(ngModel)]="selectedUser" (ngModelChange)="onUserChange()">
        <option value="">Seleccionar usuario</option>
        <option *ngFor="let user of users" [value]="user">{{ user }}</option>
      </select>
      <button (click)="addNewUser()" *ngIf="newUser">Agregar</button>
      <input
        *ngIf="showInput"
        [(ngModel)]="newUser"
        placeholder="Nombre del nuevo usuario"
        (keyup.enter)="addNewUser()"
      />
      <button (click)="toggleInput()" [class.active]="showInput">
        {{ showInput ? 'Cancelar' : 'Nuevo Usuario' }}
      </button>
    </div>
  `,
  styles: [`
    .user-selector {
      margin: 1rem 0;
      display: flex;
      gap: 1rem;
      align-items: center;
    }
    select, input {
      padding: 0.5rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    button {
      padding: 0.5rem 1rem;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:hover {
      background-color: #0056b3;
    }
    button.active {
      background-color: #dc3545;
    }
  `]
})
export class UserSelectorComponent implements OnInit {
  users: string[] = ['cliente1', 'cliente2', 'cliente3'];
  selectedUser: string = '';
  newUser: string = '';
  showInput: boolean = false;
  private isBrowser: boolean;

  constructor(
    private tokenService: TokenService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      // Recuperar el usuario seleccionado del localStorage solo en el navegador
      const savedUser = localStorage.getItem('selectedUser');
      if (savedUser) {
        this.selectedUser = savedUser;
        this.tokenService.setCurrentUser(savedUser);
      }
    }
  }

  onUserChange() {
    if (this.selectedUser && this.isBrowser) {
      localStorage.setItem('selectedUser', this.selectedUser);
      this.tokenService.setCurrentUser(this.selectedUser);
    }
  }

  toggleInput() {
    this.showInput = !this.showInput;
    if (!this.showInput) {
      this.newUser = '';
    }
  }

  addNewUser() {
    if (this.newUser && !this.users.includes(this.newUser)) {
      this.users.push(this.newUser);
      this.selectedUser = this.newUser;
      this.onUserChange();
      this.newUser = '';
      this.showInput = false;
    }
  }
} 