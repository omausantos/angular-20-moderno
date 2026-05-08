import { Routes } from "@angular/router";
import { Home } from "./home";
import { CreateOrEditComponent } from "./pages/create-or-edit/create-or-edit.component";
import { gettransactionbyidResolver } from "./pages/create-or-edit/resolvers/gettransactionbyid-resolver";

export default <Routes> [
  {
    path: '',
    component: Home,
  },
  {
    path: 'create',
    component: CreateOrEditComponent,
  },
  {
    path: 'edit/:id',
    component: CreateOrEditComponent,
    resolve: {
      transaction: gettransactionbyidResolver
    }
  }
];
