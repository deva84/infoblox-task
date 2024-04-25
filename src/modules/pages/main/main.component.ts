import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  ItemAction,
  NATSpace,
  ServerStatus,
  ServerWithState
} from '../../../models/common';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class MainComponent {
  @Input() servers: ServerWithState[] = [];
  @Input() natSpaces: NATSpace[] = [];

  @Output() serverStateChange = new EventEmitter<number>();
  @Output() itemUpdate = new EventEmitter<ItemAction>();

  protected ItemAction = ItemAction;
  private serverBoilerPlate: ServerWithState = {
    id: null,
    name: '',
    description: '',
    nat_space_id: '',
    server_ip: '',
    server_nat_ip: '',
    status: ServerStatus.PENDING
  };

  public onServerSelectedChange(server: ServerWithState): void {
    this.serverStateChange.emit(server.id as number);
  }

  public trackByID(index: number, server: ServerWithState): string | number {
    return server.id ?? index;
  }

  public toggleExpansion(server: ServerWithState): void {
    server.expanded = !server.expanded;
  }

  public getIcon(server: ServerWithState): string {
    const baseUrl = 'assets/';
    if (server.status === ServerStatus.ONLINE) {
      return `${baseUrl}check.png`;
    }

    if (server.status === ServerStatus.ERROR) {
      return `${baseUrl}remove.png`;
    }

    return `${baseUrl}clock.png`;
  }

  public updateItem(action: ItemAction): void {
    console.log('!!! click', action);
    this.itemUpdate.emit(action);
  }

  public isDisabled(): boolean {
    return !this.servers.some((server) => !!server.selected);
  }
}
