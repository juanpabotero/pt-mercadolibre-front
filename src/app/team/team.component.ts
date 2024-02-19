import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import {
  Player,
  PlayersResponse,
  TeamResponse,
  TrainingForm,
  Response,
} from './interfaces';
import { TeamService } from './team.service';

@Component({
  selector: 'app-team',
  standalone: true,
  imports: [
    HttpClientModule,
    InputNumberModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
  ],
  templateUrl: './team.component.html',
  styleUrl: './team.component.scss',
  providers: [TeamService],
})
export class TeamComponent {
  public isDialogVisible = false;

  public isInputNewPLayerVisible = false;

  public form = this.fb.group({
    trainings: this.fb.array([]),
  });

  public newPLayerName = '';

  public message = '';

  public players!: PlayersResponse;

  public startingPlayers: TeamResponse | undefined = undefined;

  get trainings() {
    return this.form.controls['trainings'] as unknown as FormArray<
      FormGroup<TrainingForm>
    >;
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly teamService: TeamService
  ) {}

  public ngOnInit() {
    this.getPlayers();
  }

  public addNewPlayer() {
    if (!this.newPLayerName) return;
    const player: Player = { name: this.newPLayerName };
    this.createPlayer(player);
    this.newPLayerName = '';
    this.isInputNewPLayerVisible = false;
  }

  public createPlayer(player: Player) {
    this.teamService.createPLayer(player).subscribe({
      next: (response: Player) => {
        this.players.players.push(response);
        this.addTraining();
      },
      error: () => {
        this.isDialogVisible = true;
        this.message = 'Error creating player';
      },
    });
  }

  public getPlayers() {
    this.teamService.getPLayers().subscribe((response: PlayersResponse) => {
      this.players = response;
      response.players.forEach(() => {
        this.addTraining();
      });
    });
  }

  public getTeam() {
    this.teamService.getTeam().subscribe({
      next: (response: TeamResponse | Response) => {
        if ('message' in response) {
          this.isDialogVisible = true;
          this.message = response.message;
          return;
        }
        this.startingPlayers = response as TeamResponse;
      },
      error: () => {
        this.isDialogVisible = true;
        this.message = 'Error getting team';
      },
    });
  }

  public removePlayer(id: number | undefined) {
    if (id === undefined) return;
    this.teamService.removePlayer(id).subscribe({
      next: () => {
        this.isDialogVisible = true;
        this.message = 'Player removed successfully';
        this.form.reset();
        this.trainings.clear();
        this.startingPlayers = undefined;
        this.getPlayers();
      },
      error: () => {
        this.isDialogVisible = true;
        this.message = 'Error removing player';
      },
    });
  }

  public onSubmit() {
    this.trainings.controls.forEach((stat) => {
      stat.controls.distance.markAsDirty();
      stat.controls.passes.markAsDirty();
      stat.controls.power.markAsDirty();
      stat.controls.time.markAsDirty();
    });
    if (this.form.invalid) {
      return;
    }
    let training: any = { players: [] };
    this.form.value.trainings?.forEach((stat: any, index) => {
      training.players.push({
        ...this.players.players[index],
        stats: [
          {
            power: String(stat.power),
            passes: String(stat.passes),
            speed: { distance: String(stat.distance), time: String(stat.time) },
          },
        ],
      });
    });
    this.trainings.controls.forEach((stat) => {
      stat.controls.distance.reset();
      stat.controls.passes.reset();
      stat.controls.power.reset();
      stat.controls.time.reset();
    });
    this.teamService.createTrainig(training).subscribe({
      next: () => {
        this.isDialogVisible = true;
        this.message = 'Training created successfully';
      },
      error: () => {
        this.isDialogVisible = true;
        this.message = 'Error creating training';
      },
    });
  }

  private addTraining() {
    const TrainingForm = this.fb.group({
      power: this.fb.control('', [
        Validators.required,
        Validators.min(0),
        Validators.max(10000),
      ]) as FormControl<string>,
      distance: this.fb.control('', [
        Validators.required,
        Validators.min(0),
        Validators.max(10000),
      ]) as FormControl<string>,
      time: this.fb.control('', [
        Validators.required,
        Validators.min(0),
        Validators.max(10000),
      ]) as FormControl<string>,
      passes: this.fb.control('', [
        Validators.required,
        Validators.min(0),
        Validators.max(10000),
      ]) as FormControl<string>,
    });
    this.trainings.push(TrainingForm);
  }
}
