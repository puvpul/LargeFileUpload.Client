import { Component, OnInit } from '@angular/core';
import { TokenService } from './service/token.service';
import { Contact } from './models/contact';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'ApvmaFileUpload.Client';
  contactData: Contact;
  constructor(private tokenService: TokenService) { }

  ngOnInit(){
    var urlParams = new URLSearchParams(window.location.search);
    var contactId = urlParams.get('contactid');
    
    if(contactId)
    {
       this.tokenService.getToken(contactId).subscribe(c => {
        this.contactData = c;
        console.log(this.contactData);
      });
      
    }
  }
}
