import { Component, OnInit } from '@angular/core';
import { Enterprise } from './enterprise';
import { EnterpriseService} from './enterprise.service';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-enterprise',
  templateUrl: './enterprise.component.html',
  styleUrls: ['./enterprise.component.css'],
  styles: [`
        :host ::ng-deep .p-dialog .product-image {
            width: 150px;
            margin: 0 auto 2rem auto;
            display: block;
        }
    `],
  providers: [MessageService,ConfirmationService]
})
export class EnterpriseComponent implements OnInit {

  enterprises: Enterprise[];

  enterpriseDialog: boolean;

  enterprise: Enterprise;

  selectedEnterprises: Enterprise[];

  submitted: boolean;
  isCreate: boolean;
  mensaje: string = 'JAJJAA';
  menDetail: string = "hppalla";

  statuses: any[];

  constructor(private enterpriseService: EnterpriseService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private router: Router,
              private activatedRoute : ActivatedRoute
             ){}

  ngOnInit(){
    this.refreshEnterprises()
  }

  refreshEnterprises(){
    this.enterpriseService.getEnterprises().subscribe(
      (enterprises) => this.enterprises = enterprises
    );
  }

  openNew() {
      //this.enterprise = {}
      this.enterprise = new Enterprise();
      this.submitted = false;
      this.enterpriseDialog = true;
      this.isCreate = true;
  }

  deleteSelectedEnterprises() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected products?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.enterprises = this.enterprises.filter(val => !this.selectedEnterprises.includes(val));
                this.selectedEnterprises = null;
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
            }
        });
    }

    editEnterprise(enterprise: Enterprise) {
        this.enterprise = {...enterprise};
        this.enterpriseDialog = true;
        this.isCreate = false;
    }

    deleteEnterprise(enterprise2: Enterprise) {
        this.confirmationService.confirm({
            message: 'Estas seguro de eliminar el registro ?',
            header: 'Confirmar',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                //this.enterprises = this.enterprises.filter(val => val.enterpriseId !== enterprise.enterpriseId);
                //this.enterprise = {};

                this.enterpriseService.delete(enterprise2.enterpriseId).subscribe(
                  enterprise => {
                    this.enterprises = this.enterprises.filter(enter => enter !== enterprise2);
                    this.router.navigate(['/enterprises'])
                  }
                )

                this.enterprise = new Enterprise();
                this.messageService.add({severity:'success', summary: 'Registro Eliminado', life: 3000});
            }
        });
    }

    hideDialog() {
        this.enterpriseDialog = false;
        this.submitted = false;
    }

    saveEnterprise() {
        this.submitted = true;

        if (this.enterprise.codEnterprise.trim()) {
            if (!this.isCreate) {

                //this.enterprises[this.findIndexById(this.enterprise.codEnterprise)] = this.enterprise;

                this.enterpriseService.update(this.enterprise).subscribe(
                  enterprise => {
                    this.router.navigate(['/enterprises']);

                    this.messageService.add({severity:'success', summary: 'Se actualizo con exito', life: 3000});
                  }
                )

            }
            else {
                //this.enterprise.codEnterprise = this.createId();
                //this.product.image = 'product-placeholder.svg';
                this.enterpriseService.create(this.enterprise).subscribe(
                  enterprise => {
                    this.router.navigate(['/enterprises']);

                    this.enterprises.push(enterprise);
                    //this.messageService.add({severity:'success', summary: `La Empresa ${enterprise.description} se creo con exito` , life: 3000});
                    this.messageService.add({severity:'success', summary:'Se registró con exito' , life: 3000});

                  }
                )

                this.enterprise = new Enterprise();
            }

            this.enterprises = [...this.enterprises];
            this.enterpriseDialog = false;

            this.refreshEnterprises();
        }


        this.hideDialog();
    }

    cargarEnterprise() : void{
      this.activatedRoute.params.subscribe(params => {
        let id = params['id']

        if(id){
          this.enterpriseService.getEnterprise(id).subscribe( (enterprise) => this.enterprise = enterprise)
        }

      })
    }



}
