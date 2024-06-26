import { AfterViewInit, Component, ContentChild, ElementRef, Input, OnChanges, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrl: './server-element.component.css',
  encapsulation: ViewEncapsulation.Emulated,
})
export class ServerElementComponent implements OnInit, OnChanges, AfterViewInit{
  @Input('srvElement') element: {name: string, type: string, content: string};
  @ViewChild('header') header: ElementRef;
  @ContentChild('contentParagraph') contentParagraph: ElementRef;
  /**
   *
   */
  constructor() {
    console.log('ctr called');
    
  }

  ngOnChanges(changes) {
    console.log('onchanges called', changes);
    
  }

  ngOnInit() {
    console.log('oninit called');
  }

  ngAfterViewInit() {
    console.log('afterInit: ', this.contentParagraph.nativeElement);
    

  }

}
