import { Component, AfterViewInit, Input, ViewChild, ElementRef, signal } from '@angular/core';
import WaveSurfer from 'wavesurfer.js';

@Component({
  selector: 'app-wave-audio',
  standalone: true,
  imports: [],
  templateUrl: './wave-audio.component.html',
  styleUrl: './wave-audio.component.scss'
})
export class WaveAudioComponent implements AfterViewInit {

  @Input({required: true}) audioUrl!: string; 
  @ViewChild('wave') waveContainer!: ElementRef;
  private waveSurfer!: WaveSurfer;
  isPlaying = signal(false);

  ngAfterViewInit(): void {

   this.waveSurfer = WaveSurfer.create({
      container: this.waveContainer.nativeElement,
      waveColor: '#4F4A85',
      progressColor: '#383351',
      url: this.audioUrl,
    });

    this.waveSurfer.on('play', () => {
      this.isPlaying.set(true);
    });

    this.waveSurfer.on('pause', () => {
      this.isPlaying.set(false);
    });
      
  }

  playPause() {
    this.waveSurfer.playPause();
  }

}
