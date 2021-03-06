import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

/**
 * Angular Wrapper for the SohoAlert Directive.
 *
 */
@Directive({
  selector: '[soho-alert]', // tslint:disable-line
  exportAs: 'soho-alert'
})
export class SohoAlertDirective implements AfterViewInit {

  private _options: SohoAlertOptions = {};
  private jQueryElement: JQuery;

  /** Set or remove the message. */
  @Input()
  public set message(message: string) {
    this._options.message = message;
    if (this.jQueryElement) {
      if (message) {
        this.jQueryElement.addMessage(this._options);
      } else {
        this.jQueryElement.removeMessage(this._options);
      }
    }
  }

  /** Set message with the SohoAlertType. */
  @Input()
  public set type(type: SohoAlertType) {
    this._options.type = type;
  }

  /** Set message with or without control color */
  @Input()
  public set isAlert(isAlert: boolean) {
    this._options.isAlert = isAlert;
  }

  /**
   * Returns the data object data-errormessage
   * @deprecated use getMessage() instead
   * @returns {string}
   */
  get errorMessage(): string {
    return this.getMessage('error');
  }

  constructor(public elementRef: ElementRef) {
    this._options.inline = true;
  }

  /**
   * After the control has been initialised and the view is ready,
   * get the SoHoXi controls to activate any alerts.
   */
  ngAfterViewInit() {
    this.jQueryElement = jQuery(this.elementRef.nativeElement);
  }

  // public methods
  /**
   * Adds an inline error message
   * @deprecated use addInlineMessage() instead
   * @param message
   */
  addInlineError(message: string) {
    this.addInlineMessage(message, 'error');
  }

  /**
   * Adds an inline message of the type specified
   *
   * @param message
   * @param type; defaults to 'error'
   * @param isAlert; defaults to false
   */
  addInlineMessage(message: string, type?: SohoAlertType, isAlert?: boolean) {
    this.type = type || 'error';
    this.isAlert = isAlert || false;
    this.message = message;
  }

  /**
   * Gets the message of the type specified
   *
   * @param type; defaults to 'error'
   * @returns {string}
   */
  getMessage(type?: SohoAlertType): string {
    if (this.jQueryElement) {
      this.type = type || 'error';
      return this.jQueryElement.getMessage(this._options);
    }

    return '';
  }

  /**
   * Removes the error message
   * @deprecated use removeMessage() instead
   */
  removeError() {
    this.removeMessage('error');
  }

  /**
   * Removes the message of the type specified
   *
   * @param type; defaults to 'error'
   */
  removeMessage(type?: SohoAlertType) {
    this.type = type || 'error';
    this.message = '';
  }

  /**
   * Removes the message for all types
   *
   */
  removeAllMessages() {
    this.removeMessage('error');
    this.removeMessage('alert');
    this.removeMessage('confirm');
    this.removeMessage('info');
  }

  /**
   * Scrolls the element into the visible area of the browser window
   *
   * @param alignToTop (boolean) optional - true (default) element will be aligned to the top of the visible area of the scrollable ancestor
   */
  scrollIntoView(alignToTop?: boolean) {
    if (this.jQueryElement) {
      this.jQueryElement.scrollIntoView(alignToTop, this._options);
    }
  }
}
