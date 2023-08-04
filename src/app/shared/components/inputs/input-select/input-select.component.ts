import {
  Component, Input, Output,
  ElementRef, EventEmitter, ViewChild,
  HostListener, SimpleChanges, OnChanges
} from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { NgIf, NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { SkeletonComponent } from '../../skeleton/skeleton.component';

interface Option {
  id: string; name: string;
};

@Component({
    selector: 'app-input-select',
    templateUrl: './input-select.component.html',
    styleUrls: ['../inputs.component.scss'],
    standalone: true,
    imports: [NgIf, NgFor, PortalModule, SkeletonComponent, MatIconModule]
})
export class InputSelectComponent {
  @Input() class: string = '';
  @Input() icon: string = '';
  @Input() preText: string = '';
  @Input() placeholder: string = '';
  @Input() isRequired: boolean = false;
  @Input() isDisabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() value: string | null = '';
  @Input() name: string = '';
  @Input() error: string = '';
  @Input() control: any = null;
  @Input() options: Array<{ id: string; name: string }> = [];
  @Output() valueChange = new EventEmitter<string>();
  protected showOptions: Boolean = false;

  get selectedOption(): Option | undefined {
    this.selectedIndex = this.options.findIndex((option: Option) => option.id === (this.control?.value || this.value));
    return this.options[this.selectedIndex]
  }
  selectedIndex= 0;

  @ViewChild('select') public select!: ElementRef;
  @ViewChild(CdkPortal) public contentTemplate!: CdkPortal;
  private overlayRef!: OverlayRef;

  constructor(private overlay: Overlay) {}

  @HostListener('window:resize')
  onResize() {
    this.syncWidth();
  }

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'ArrowUp' && this.selectedIndex > 0) {
      this.selectedIndex--;
      event.preventDefault();
      this.selectOption(this.options[this.selectedIndex]);
    } else if (event.key === 'ArrowDown' && this.selectedIndex < this.options.length - 1) {
      event.preventDefault();
      this.selectedIndex++;
      this.selectOption(this.options[this.selectedIndex]);
    } else if (event.key === 'Enter') {
      this.hide();
    }
  }

  public selectOption(option: Option, index: number | null = null) {
    if(index || index === 0) {
      this.selectedIndex = index;
      this.hide();
    }

    if (this.control && this.control?.value !== option.id) {
      this.control.setValue(option.id);

    } else if (this.value !== option.id) {
      this.valueChange.emit(option.id);
    }
  }

  public showDropdown(): void {
    this.overlayRef = this.overlay.create(this.getOverlayConfig());
    this.overlayRef.attach(this.contentTemplate);
    this.syncWidth();
    this.overlayRef.backdropClick().subscribe(() => this.hide());
    this.overlayRef.keydownEvents().subscribe((event: KeyboardEvent) => {
      if (event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'Enter') {
        this.onKeyDown(event);
      }
    });
    this.showOptions = true;
  }

  private hide(): void {
    this.overlayRef.detach();
    this.showOptions = false;
  }

  private syncWidth(): void {
    if (this.overlayRef) {
      const refRectWidth =
        this.select.nativeElement.getBoundingClientRect().width;
      this.overlayRef.updateSize({ width: refRectWidth });
    }
  }

  private getOverlayConfig(): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.select.nativeElement)
      .withPush(true)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
          offsetY: 4,
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
          offsetY: -4,
        },
      ]);

    const scrollStrategy = this.overlay.scrollStrategies.reposition();
    return new OverlayConfig({
      positionStrategy: positionStrategy,
      scrollStrategy: scrollStrategy,
      hasBackdrop: true,
      backdropClass: 'cdk-overlay-transparent-backdrop',
    });
  }
}
