import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { BlobServiceClient, AnonymousCredential,newPipeline } from '@azure/storage-blob';
import { async } from '@angular/core/testing';

@Component({
    selector: 'app-upload',
    templateUrl: '../upload/upload.component.html',
    styleUrls: ['../upload/upload.component.css']
  })

  export class UploadComponent implements OnInit
  {
    public progress: number;
    public message: string;
    @Output() public onUploadFinished = new EventEmitter();

      constructor(private http: HttpClient) { }

      ngOnInit(){ }

      public uploadFile = async(files) =>
      {
        const pipeline =newPipeline (new AnonymousCredential(),{
            retryOptions: { maxTries: 4 }, // Retry options
            userAgentOptions: { userAgentPrefix: "AdvancedSample V1.0.0" }, // Customized telemetry string
            keepAliveOptions: {
                // Keep alive is enabled by default, disable keep alive by setting false
                enable: false
            }
        });
        const sasToken = JSON.parse(localStorage.getItem('sasToken'));
        
        const azureUrl = sasToken.AzureUrl;
        console.log(azureUrl);
        
        const blobServiceClient =new BlobServiceClient(`${azureUrl}${sasToken.Token}`, pipeline);
        const containerClient = blobServiceClient.getContainerClient('apvma-largeblob');
        const promises = [];
         try{
            this.message = 'Uploading file now ... Please Wait';
            
            let fileToUpload = <File>files[0];
            const blockBlobClient = containerClient.getBlockBlobClient(fileToUpload.name);
            promises.push(blockBlobClient.uploadBrowserData(fileToUpload));
            
            const response = await Promise.all(promises);
            console.log(response);
            this.message = 'Done ...';
         }
         
         catch (error) {
            this.message = error.message;
         }
         
      }
  }