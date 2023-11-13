/*
  HY469 - 2023 - 2024 SOCKET EXAMPLE
*/

import { Component, OnInit } from '@angular/core';
import { SocketsService } from 'src/app/global/services/sockets/sockets.service';

@Component({
  selector: 'app-pingme',
  templateUrl: './pingme.component.html',
  styleUrls: ['./pingme.component.scss']
})
export class PingmeComponent implements OnInit{

  constructor(
    public socketService: SocketsService
    ) {}

  my_uuid: string = Math.floor((Math.random()*10000)).toString() 
  clients:string[] = []
  lastPing: {timestamp: string, from: string} = {
    timestamp: "no ping", from: "no ping"
  } 
  from: string = '';

  ngOnInit() {
    
    this.setup_self()
    this.catch_new_clients()

    this.catch_pings()
  }

  setup_self() {
    this.advertise_self();
    this.clients.push("ME -- " +this.my_uuid)
  }

  public advertise_self() {
    this.socketService.publish(
      "advertise",
      {uuid: this.my_uuid}
    )
  }

  catch_new_clients() {

    this.socketService.subscribe("advertise", (data:any) => {
      console.log(data)

      if(!this.clients.find((entry) => entry === "ME -- " + data.uuid)) {
        this.clients.push(data.uuid)
      }
    })
  }

  catch_pings() {

    this.socketService.subscribe("ping:"+this.my_uuid, (data:any) => {
      
      console.log("GOT PINGED!")
      console.log(data)
      
      this.lastPing.from = data.from ?? "invalid";
      this.lastPing.timestamp = data.timestamp ?? "invalid";
    })
  }

  ping_someone() {
    this.ping(this.from);
  }

  public ping(client:string) {
    this.socketService.publish(
      "ping:"+client, 
      {timestamp: Date.now(), from: this.my_uuid}
    );
  }
}
