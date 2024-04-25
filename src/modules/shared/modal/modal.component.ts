import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {
  ItemAction,
  NATSpace,
  Server,
  ServerStatus,
  ServerWithState
} from '../../../models/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
  @Input() server: ServerWithState = {} as ServerWithState;
  @Input() natSpaces: NATSpace[] = [];
  @Input() action: ItemAction = ItemAction.CREATE;

  @Output() save: EventEmitter<Server> = new EventEmitter<Server>();

  public onSubmit(): void {
    this.save.emit(this.server);
    this.closeModal();
  }

  public closeModal(): void {}

  public getModalName(): string {
    if (this.action === ItemAction.CREATE) {
      return 'Create Server';
    }

    return `Edit ${this.server.name}`;
  }

  protected readonly ItemAction = ItemAction;
}
