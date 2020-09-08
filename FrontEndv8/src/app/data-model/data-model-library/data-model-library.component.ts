import { Related } from './../../models/Related';
import { PagedResultSet } from './../../models/PagedResultSet';
import {Component, OnInit, ViewChild} from '@angular/core';
import {ConceptService} from '../../concept.service';
import {Concept} from '../../models/Concept';
import {Related} from '../../models/Related';
import {Property} from '../../models/Property';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {LoggerService} from 'dds-angular8/logger';
import {ConceptTreeViewComponent} from 'im-common/im-controls';
import {KeycloakService} from 'keycloak-angular';
import {zip, Observable, Subject} from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { animate, state, style, transition, trigger } from '@angular/animations';
import {DataModelTablularViewComponent} from '../../components/data-model-tabular-view/data-model-tabular-view.component';

const debug = (message: string) => { console.log(message); };

@Component({
  selector: 'app-data-model-library',
  templateUrl: './data-model-library.component.html',
  styleUrls: ['./data-model-library.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],  
})
class DataModelLibraryComponent implements OnInit {

  selectedIri: string;
  concept: Concept;

  searchSize = 72;
  root = ':DM_DataModel';
  relationships = [':SN_116680003'];
  selected = 'dataModel';

  DM_HealthEvent: PagedResultSet<Related>;
  DM_IdentifiableEntity: PagedResultSet<Related>;
  DM_Provenance: PagedResultSet<Related>;
  DM_StateEntry: PagedResultSet<Related>;
  DM_StructuredArtefact: PagedResultSet<Related>;
  history = [];

  @ViewChild(ConceptTreeViewComponent, {static: true}) treeView: ConceptTreeViewComponent;
  @ViewChild(DataModelTablularViewComponent, {static: true}) tableView: DataModelTablularViewComponent;

  constructor(private service: ConceptService,
              private router: Router,
              private auth: KeycloakService,
              private route: ActivatedRoute,
              private log: LoggerService) {

              this.routeEvent(this.router);
  }

  routeEvent(router: Router){
    router.events.subscribe(e => {
      if(e instanceof NavigationEnd && this.concept != undefined){
        this.history.unshift(
          {
            'url': e.url,
            'concept': this.concept
          }
        );
      }
    });
  }

  ngOnInit() {
    // Direct URL nav - need to push to tree
    this.route.queryParamMap.subscribe(
      (params) => this.displayConcept(params.get('id') ? params.get('id') : this.root),
      (error) => this.log.error(error)
    );

    this.service.getSources(':DM_HealthEvent', null, 20, 1).subscribe(
      (result) => this.DM_HealthEvent = result,
      (error) => this.log.error(error)
    );

    this.service.getSources(':DM_IdentifiableEntity', null, 20, 1).subscribe(
      (result) => this.DM_IdentifiableEntity = result,
      (error) => this.log.error(error)
    );

    this.service.getSources(':DM_Provenance', null, 20, 1).subscribe(
      (result) => this.DM_Provenance = result,
      (error) => this.log.error(error)
    );

    this.service.getSources(':DM_StateEntry', null, 20, 1).subscribe(
      (result) => this.DM_StateEntry = result,
      (error) => this.log.error(error)
    );

    this.service.getSources(':DM_StructuredArtefact', null, 20, 1).subscribe(
      (result) => this.DM_StructuredArtefact = result,
      (error) => this.log.error(error)
    );


  }

  displayConcept(iri: string) {
    if (this.selectedIri !== iri) {
      this.selectedIri = iri;
      this.service.getConcept(iri).subscribe(
        (result) => this.concept = result,
        (error) => this.log.error(error)
      );
    }
  }

  goto(iri: string) {
    if (iri !== this.selectedIri) {
      this.router.navigate(['dataModel'], {queryParams: {id: iri}});
    }
  }

  hasResults(displayed: boolean) {
    this.searchSize = displayed ? 256 : 72;
  }

  logout() {
    this.auth.logout();
  }
  
}

export {
  DataModelLibraryComponent
}
