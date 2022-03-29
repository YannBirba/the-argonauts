import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Argonaut } from 'src/models/argonaut.model';

@Component({
  selector: 'app-argonaut',
  templateUrl: './argonaut.component.html',
  styleUrls: ['./argonaut.component.scss'],
})
export class ArgonautComponent implements OnInit {
  @Input() argonaut: Argonaut | null = null;
  @Input() image: string | null = null;
  @Output() delete: EventEmitter<number> = new EventEmitter<number>();
  @Output() update: EventEmitter<Argonaut> = new EventEmitter<Argonaut>();
  constructor() {}

  ngOnInit(): void {}
  public onDelete(id: number | undefined): void {
    if (id) {
      this.delete.emit(id);
    }
  }

  public onUpdate(event: any): void {
    if (this.argonaut) {
      if (event.target.innerText && event.target.innerText.length > 2 && event.target.innerText.length < 20) {
        this.update.emit({
          id: this.argonaut.id,
          name: event.target.innerText,
          created_at: this.argonaut.created_at,
          updated_at: this.argonaut.updated_at,
        });
      }
    }
  }
}
