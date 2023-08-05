import { Injectable } from '@angular/core';


interface CustomError {
  name: string,
  statusCode?: string
  message?: string,
  field?: string,
}

@Injectable({
  providedIn: "root",
})
export class ErrorService {
  private error: CustomError | null = null;
  timeoutRef: any;

  public setError(error: CustomError | null) {
    this.clearError();
    this.error = error;
    this.timeoutRef = setTimeout(() => {
      this.error = null;
    }, 5000);
  }

  public getError() {
    return this.error;
  }

  public clearError() {
    this.error = null;
    clearTimeout(this.timeoutRef);
  }
}
