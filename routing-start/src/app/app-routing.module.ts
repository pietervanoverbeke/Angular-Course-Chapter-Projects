import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { PageNotFoundComponent } from "./page-not-found/page-not-found.component";
import { EditServerComponent } from "./servers/edit-server/edit-server.component";
import { ServerComponent } from "./servers/server/server.component";
import { ServersComponent } from "./servers/servers.component";
import { UserComponent } from "./users/user/user.component";
import { UsersComponent } from "./users/users.component";
import { AuthGuardService } from "./auth-guard.service";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";
import { ServerResolverService } from "./servers/server/server-resolver.service";

const appRoutes: Routes = [
    {
      path: '',
      component: HomeComponent
    },
    {
      path: 'servers',
      //canActivate: [AuthGuardService],
      canActivateChild: [AuthGuardService],
      component: ServersComponent,
      children: [
        {
          path: ':id',
          component: ServerComponent,
          resolve: {
            server: ServerResolverService
          }
        },
        {
          path: ':id/edit',
          component: EditServerComponent,
          canDeactivate: [CanDeactivateGuard]
        },
      ]
    },
    {
      path: 'users',
      component: UsersComponent,
      children: [
        {
          path: ':id/:name',
          component: UserComponent
        },
      ]
    },
    { 
      path: 'not-found',
      component: PageNotFoundComponent
    },
    { 
      path: 'something',
      redirectTo: 'not-found'
    },
    //MUST BE LAST ROUTE
    {
      path: '**',
      redirectTo: '/not-found',
    }
  ]

@NgModule({
    imports: [
        // RouterModule.forRoot(appRoutes, {
        //   useHash: true
        // })
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {

}