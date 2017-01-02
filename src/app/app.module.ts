import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CreatorComponent } from './pages/graph/graph-creator.component';
import { CreatorCanvasComponent } from './pages/graph/graph-canvas/graph-canvas.component';
import { CreatorNotificationComponent } from './pages/graph/graph-notification/graph-notification.component';
import { CreatorPropertiesComponent } from './pages/graph/graph-properties/graph-properties.component';
import { CreatorToolsComponent } from './pages/graph/graph-tools/graph-tools.component';

import { CreatorService } from './shared/graph-creator.service';


@NgModule({
  declarations: [
    AppComponent,
    CreatorComponent,
    CreatorCanvasComponent,
    CreatorNotificationComponent,
    CreatorPropertiesComponent,
    CreatorToolsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [CreatorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
