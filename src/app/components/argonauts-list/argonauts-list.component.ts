import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable, Subscription, tap } from 'rxjs';
import { Argonaut } from 'src/models/argonaut.model';
import { ArgonautService } from 'src/shared/services/argonaut/argonaut.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-argonauts-list',
  templateUrl: './argonauts-list.component.html',
  styleUrls: ['./argonauts-list.component.scss'],
})
export class ArgonautsListComponent implements OnDestroy, OnInit {
  public argonautsSubject: BehaviorSubject<Argonaut[]> = new BehaviorSubject(
    [] as Argonaut[]
  );
  public argonautsList$: Observable<Argonaut[]> = this
    .argonautsSubject as Observable<Argonaut[]>;
  public argonautForm: FormGroup;
  private subscription: Subscription | null = null;

  constructor(
    private argonautService: ArgonautService,
    private http: HttpClient,
    private formBuilder: FormBuilder
  ) {
    this.argonautForm = this.formBuilder.group({
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(20),
        ],
      ],
    });
  }

  public ngOnInit(): void {
    this.subscription = this.argonautService.getAll().subscribe((argonauts) => {
      this.argonautsSubject.next(argonauts);
    });
  }

  public ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  public trackBy(index: number, argonaut: Argonaut): number | undefined {
    return argonaut.id;
  }

  public argonautImage(id: number | undefined): string {
    if (id) {
      return `https://joeschmoe.io/api/v1/male/${id.toString()}`;
    } else {
      return '';
    }
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (!this.argonautForm.valid) {
      return;
    }
    const formData: Argonaut = this.argonautForm?.value;
    if (formData) {
      const response$: Observable<any> = this.argonautService.create(formData);
      this.subscription = response$.subscribe({
        next: (response) => {
          this.argonautsSubject.next(
            [...this.argonautsSubject.value, response.argonaut].sort(
              (a, b) => b.id - a.id
            )
          );
          this.argonautForm.reset();
        },
        error: (error) => {
          console.error('error', error);
        }
      });
    }
  }
  onDelete(id: number): void {
    if (id) {
      this.subscription = this.argonautService.delete(id).subscribe({
        next: (response) => {
          this.argonautsSubject.next(
            this.argonautsSubject.value.filter((argonaut) => argonaut.id !== id)
          );
        },
        error: (error) => {
          console.error('error', error);
        }
      });
    }
  }
  onUpdate(argonaut : Argonaut): void {
    if (argonaut) {
      this.subscription = this.argonautService.update(argonaut).subscribe({
        error: (error) => {
          console.error('error', error);
        }
      });
    }
  }
}
