import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { Button } from '../table.interface';
import { NgFor } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-table-row-menu',
    templateUrl: './row-menu.component.html',
    styleUrls: ['./row-menu.component.scss'],
    standalone: true,
    imports: [MatIconModule, PortalModule, NgFor]
})
export class RowMenuComponent {
  @Input() buttons?: Button[] = [];

  @ViewChild('menuBtn') public menuBtn!: ElementRef;
  @ViewChild(CdkPortal) public contentTemplate!: CdkPortal;
  private overlayRef!: OverlayRef;
  
  constructor(private overlay: Overlay) {}

  handleClick(btn: Button) {
    if (btn.onClick){
      btn.onClick();
    }
    this.hide();
  }

  public showDropdown(): void {
    this.overlayRef = this.overlay.create(this.getOverlayConfig());
    this.overlayRef.attach(this.contentTemplate);
    this.overlayRef.backdropClick().subscribe(() => this.hide());
  }

  private hide(): void {
    this.overlayRef.detach();
  }

  private getOverlayConfig(): OverlayConfig {
    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.menuBtn.nativeElement)
      .withPush(true)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
          offsetY: 4,
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'top',
          offsetY: -100,
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
