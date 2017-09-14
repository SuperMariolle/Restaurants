import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import PouchDB from 'pouchdb';

/*
  Generated class for the RestosProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class RestosProvider {

  data:any;
  db: any;
  remote: any;

  constructor(public http: Http) {

    this.db = new PouchDB('resto_db');

    this.remote = 'http://localhost:5984/restaurants' //sujet à erreur - à vérifier en cas de soucis

    let options = {
      live:true,
      retry:true,
      continuous:true
    };

    this.db.sync(this.remote, options);

    console.log('Hello RestosProvider Provider');
  }

  public getRestaurants(){
      if(this.data){
        return Promise.resolve(this.data);
      }

      return new Promise(resolve =>{
       
        this.db.allDocs({
            include_docs:true,
        }).then((result)=>{

          this.data = [];

          result.rows.map((row)=>{
            this.data.push(row.doc);
          });

          resolve(this.data);

          this.db.changes({live:true, since:'now', include_docs:true}).on('change', (change) => {
            this.handleChange(change);
          });
          console.log(this.data);
        }).catch((error)=> {
          console.log(error);
        });
      });
  }
  // fonction appelée lorsque des données ont été changées dans la BD.
  // met la sauvegarde locale à jour.

  handleChange(change){
      let changedDoc = null;
      let changedIndex = null;

      this.data.forEach((doc, index) => {
        
          if(doc._id === change.id){
            changedDoc = doc;
            changedIndex = index;
          }
      });

      //A document was deleted
      if(change.deleted){
        this.data.splice(changedIndex, 1);
      }else{

        // A document was updated
        if(changedDoc){
          this.data[changedIndex] = change.doc;
        }

        // A document was added
        else{
          this.data.push(change.doc);
        }
      }

  }

}
