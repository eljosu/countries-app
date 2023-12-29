import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country.interface';

@Component({
  selector: 'app-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})


export class CountryPageComponent implements OnInit{

  public country?: Country;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private countriesService: CountriesService
    ) {}

  // ngOnInit(): void {
    // this.activatedRoute.params
  //     .subscribe( ({id}) => {

  //       this.searchCountry(id);

  //   });

  // }

  // searchCountry(code:string) {
  //   this.countriesService.searchCountryByAlphaCode(code)
  //         .subscribe(country => {
  //           console.log(country[0].name.common);

  //   });
  // }

  ngOnInit(): void {
  this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.countriesService.searchCountryByAlphaCode(id) ),
    )
      .subscribe(country => {

        if(!country)
          return this.router.navigateByUrl('');
        console.log(country.translations);
        return this.country = country;

      })

  }

}


//El switchmap sirve para cambiar de suscripcion
