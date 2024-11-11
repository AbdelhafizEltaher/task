import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
  Type,
  ViewContainerRef,
  EventEmitter,
  Output,
} from '@angular/core';
import { ModalService } from '../../services/shardServices/model.service';
import { SidebarModule } from 'primeng/sidebar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-sidebar',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss'],
  standalone: true,
  imports: [SidebarModule , CommonModule],
})
export class ModelComponent implements OnInit, OnChanges, OnDestroy {
  @Input() sidebarVisible: boolean = false;
  @Input() headerText: string = '';
  @Input() component: Type<any> | null = null;
  @Input() headerTemplate: TemplateRef<any> | null = null;
  @Input() position: 'left' | 'right' | 'top' | 'bottom' = 'right';
  @Input() sidebarStyle: any = { width: '30rem' };
  @Input() closable: boolean = true;
  @Input() modelData:any;

  @Output() sidebarVisibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  componentRef: ComponentRef<any> | null = null;
  componentInjector: any;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private viewContainerRef: ViewContainerRef,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    if (this.component) {
      this.loadComponent();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['component']) {
      this.loadComponent();
    }
  }

  ngOnDestroy() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }

  onClose() {
    this.sidebarVisible = false;
    this.sidebarVisibleChange.emit(this.sidebarVisible);
  }

  private loadComponent() {
    if (this.componentRef) {
      this.componentRef.destroy();
    }

    if (this.component) {
      const componentFactory =
        this.componentFactoryResolver.resolveComponentFactory(this.component);
      this.componentRef =
        this.viewContainerRef.createComponent(componentFactory);
      this.componentInjector = this.componentRef.injector;

      // Pass the ID to the dynamically loaded component
      if (this.componentRef.instance.hasOwnProperty('modelData')) {
        (this.componentRef.instance as any).modelData = this.modelData;
      }
    }
  }

  closeSidebar(result: any) {
    this.modalService.closeSidebar(result);
  }
}
