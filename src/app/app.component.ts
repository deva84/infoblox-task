import { Component, OnInit } from '@angular/core';
import {
  ItemAction,
  NATSpace,
  NATSpacesApiResponse,
  Server,
  ServerApiResponse,
  ServerStatus,
  ServerWithState
} from '../models/common';
import * as serversData from './../../mock-data/servers/servers.json';
import * as natSpacesData from './../../mock-data/nat-spaces/nat-spaces.json';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  public title = 'servers-app';
  public servers: ServerWithState[] = [];
  public natSpaces: NATSpace[] = [];
  public showModal: boolean = false;
  public modalServer: ServerWithState = {} as ServerWithState;
  public modalAction: ItemAction = ItemAction.CREATE;

  private serverBoilerPlate: ServerWithState = {
    id: null,
    name: '',
    description: '',
    nat_space_id: '',
    server_ip: '',
    server_nat_ip: '',
    status: ServerStatus.PENDING
  };

  public ngOnInit(): void {
    this.fetchServers().subscribe({
      next: (data) => {
        this.servers = this.addServerID(data.data ?? []);
      },
      error: (error) => {
        console.error('Error fetching servers data:', error);
      }
    });
    this.fetchNatSpaces().subscribe({
      next: (data) => {
        this.natSpaces = data.data ?? [];
      },
      error: (error) => {
        console.error('Error fetching NAT spaces data:', error);
      }
    });
  }

  public onServerSelectedChange(id: number): void {
    this.servers = this.servers.map((server) => {
      const serverCopy = { ...server };
      if (serverCopy.id === id) {
        serverCopy['selected'] = !serverCopy['selected'];
      }
      return serverCopy;
    });
  }

  private fetchServers(): Observable<ServerApiResponse> {
    return of(serversData as ServerApiResponse);
  }

  private fetchNatSpaces(): Observable<NATSpacesApiResponse> {
    return of(natSpacesData as NATSpacesApiResponse);
  }

  private addServerID(servers: Server[]): ServerWithState[] {
    return servers.map((server, index) => {
      const serverCopy = { ...server } as ServerWithState;
      serverCopy['id'] = index++;
      return serverCopy;
    });
  }

  public onItemUpdate(action: ItemAction): void {
    if (action === ItemAction.REMOVE) {
      return this.deleteItems();
    }

    this.modalAction = action;
    this.showModal = true;

    if (action === ItemAction.EDIT) {
      this.modalServer = this.getSelectedItem();
    }

    if (action === ItemAction.CREATE) {
      this.modalServer = this.serverBoilerPlate;
    }
  }

  private getSelectedItem(): ServerWithState {
    return (
      this.servers.find((server) => !!server.selected) ??
      ({} as ServerWithState)
    );
  }

  private deleteItems(): void {
    this.servers = this.servers.filter((server) => !server.selected);
  }

  public closeModal(): void {
    this.showModal = false;
  }

  public onSave(server: Server): void {
    console.log('Saved server:', server);
    this.closeModal();
  }
}
