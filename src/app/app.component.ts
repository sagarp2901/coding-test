import { Component, OnInit } from '@angular/core';
import { AppService } from './services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private metaData;
  private data;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.getMetaData();
    this.getData();
  }

  async getMetaData() {
    this.metaData = await this.appService.getMetaData().toPromise();
  }

  async getData() {
    this.data = await this.appService.getData().toPromise();
  }

  getValue(fieldName) {
    return this.data[fieldName] || null;
  }

  updateValue(event, field) {
    if (field.dataType == 'Date') {
      field.newValue = new Date(event);
    } else {
      field.newValue = event.target.value;
    }
  }

  onSubmit() {
    // Declaring a new object for viewing
    let someObject = { $original: {} };
    console.log('Submit');
    this.metaData.field.forEach(field => {
      if (field.newValue && field.newValue !== this.data[field.name]) {
        someObject[field.name] = field.newValue;
        someObject['$original'][field.name] = this.data[field.name] || null;
      }
    });
    // Check if any fields changed
    if (Object.keys(someObject.$original).length === 0) {
      // Displaying on UI using alert
      alert('No new field changes here!');
    } else {
      console.log(someObject);
      // Displaying on UI using alert
      alert(JSON.stringify(someObject));
      // Storing to the session
      sessionStorage.setItem('savedOutput', JSON.stringify(someObject));
    }
  }
}
