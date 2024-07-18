import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { HomeComponent } from './pages/home/home.component';
import { LessonComponent } from './pages/lesson/lesson.component';
import { TeacherComponent } from './pages/teacher/teacher.component';
import { RoomComponent } from './pages/room/room.component';
import { ScheduleComponent } from './pages/schedule/schedule.component';
import { DashboardTemplateComponent } from './component/dashboard-template/dashboard-template.component';
import { RequestComponent } from './pages/request/request.component';
import { ScheduleViewComponent } from './pages/schedule-view/schedule-view.component';
import { ApprovalComponent } from './pages/approval/approval.component';
import { CourseViewComponent } from './pages/course-view/course-view.component';
import { UserTemplateComponent } from './component/user-template/user-template.component';
import { NotificationComponent } from './pages/notification/notification.component';
import { ScheduleGenerateComponent } from './pages/schedule-generate/schedule-generate.component';
import { HomeUserComponent } from './pages/home-user/home-user.component';
import { ApprovalViewComponent } from './pages/approval-view/approval-view.component';

export const routes: Routes = [
  { path: '', redirectTo: 'app/auth/login', pathMatch: 'full' },
  {
    path: 'app',
    children: [
      // ADMIN route
      {
        path: 'admin',
        children: [
          { path: '', component: HomeComponent },
          { path: 'lesson', component: LessonComponent },
          { path: 'teacher', component: TeacherComponent },
          { path: 'room', component: RoomComponent },
          { path: 'approval', component: ApprovalComponent },
          { path: 'approval-view/:id', component: ApprovalViewComponent },
          { path: 'schedule', component: ScheduleComponent },
          { path: 'schedule-view/:id', component: ScheduleViewComponent },
          { path: 'course-view/:id', component: CourseViewComponent },
          { path: 'schedule-generate', component: ScheduleGenerateComponent},
          { path: 'notice', component: NotificationComponent},
          {
            path: '**',
            redirectTo: 'notfound'
          },
        ],
        component: DashboardTemplateComponent,
      },
      // USER route
      {
        path: 'user',
        children: [
          { path: '', component: HomeUserComponent },
          { path: 'schedule', component: ScheduleComponent },
          { path: 'request', component: RequestComponent },
          { path: 'schedule-view/:id', component: ScheduleViewComponent },
          { path: 'course-view/:id', component: CourseViewComponent },
          { path: 'notice', component: NotificationComponent},
          {
            path: '**',
            redirectTo: 'notfound'
          },
        ],
        component: UserTemplateComponent
      },
      // AUTH route
      {
        path: 'auth',
        children: [
          { path: '', redirectTo: 'login', pathMatch: 'full' },
          {
            path: 'login',
            component: LoginComponent
          },
          {
            path: 'register',
            component: RegisterComponent
          },
          {
            path: '**',
            redirectTo: 'notfound'
          },
        ],
      }
    ]
  },
  {
    path: 'notfound',
    component: NotfoundComponent
  },
  {
    path: '**',
    redirectTo: 'notfound'
  },
];
