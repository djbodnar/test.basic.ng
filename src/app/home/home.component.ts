
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Nation } from '../model/nation';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit,OnDestroy
{
    nations: Nation[] = [];
    hilitedName = '...';
    name = "";
    nativeName = "";
    capital = "";
    latitude = 0;
    longitude = 0;
    

    constructor(
        private http:HttpClient,
        private changeDetectorRef:ChangeDetectorRef ) {}

    ngOnInit(): void {
        this.http.get<Nation[]>( 'assets/data.json' )
            .pipe()
            .subscribe( (nations:Nation[]) => {
                this.nations = nations ? nations : [];
                this.changeDetectorRef.detectChanges();
            } );
    }

    hilite( nation:Nation ) {
        this.hilitedName = nation.name;
        this.changeDetectorRef.detectChanges();
    }
    tbNationSelected(nation:Nation){
        this.name = nation.name;
        this.nativeName = nation.nativeName;
        this.capital = nation.capital;
        this.latitude = nation.latitude;
        this.longitude = nation.longitude;

    }
    ngOnDestroy(): void {
    }
}
