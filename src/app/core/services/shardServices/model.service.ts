import {
  Injectable,
  ComponentFactoryResolver,
  ApplicationRef,
  Injector,
  EmbeddedViewRef,
  ComponentRef,
  Type,
} from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ModelComponent } from '../../components/model/model.component';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private componentRef: ComponentRef<ModelComponent> | null = null;
  private resultSubject: Subject<any> = new Subject<any>();
  modelData: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  openModal(
    component: Type<any>,
    headerText: string = '',
    position: 'left' | 'right' | 'top' | 'bottom' = 'right',
    width: string = '30rem',
    modelData: any,
    closable: boolean = true
  ) {
    if (this.componentRef) {
      this.closeModal();
    }

    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(ModelComponent);
    this.componentRef = componentFactory.create(this.injector);

    this.componentRef.instance.component = component;
    this.componentRef.instance.headerText = headerText;
    this.componentRef.instance.position = position;
    this.componentRef.instance.sidebarStyle = { width: width };
    this.componentRef.instance.closable = closable;
    this.componentRef.instance.sidebarVisible = true;
    this.componentRef.instance.modelData = modelData;
    this.modelData.next(modelData);

    this.componentRef.instance.closeSidebar = this.closeSidebar.bind(this);

    this.appRef.attachView(this.componentRef.hostView);

    const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);
  }

  closeModal() {
    if (this.componentRef) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }

  closeSidebar(result: any) {
    this.closeModal();
    this.resultSubject.next(result);
  }

  getResult() {
    return this.resultSubject.asObservable();
  }
}
