import { ComponentFixture, TestBed } from '@angular/core/testing';
// TestBed — Angular's testing module, like a mini Angular app just for tests
// ComponentFixture — a wrapper around your component that lets you interact with it in tests
import { TaskListComponent } from './task-list.component';

// This is a basic test suite for the TaskListComponent. It checks if the component can be created successfully.
describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  // beforeEach is a setup function that runs before each test. Here we configure the testing module and create an instance of the component.
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskListComponent],
    }).compileComponents();
    // After compiling the components, we create a fixture and get the instance of the component from it.
    fixture = TestBed.createComponent(TaskListComponent);
    // component is the actual instance of TaskListComponent that we can interact with in our tests
    component = fixture.componentInstance;
    // fixture.detectChanges() tells Angular to run change detection, which initializes the component and renders the template. This is important for testing the component in a state that closely resembles how it would behave in a real application.
    fixture.detectChanges();
  });
  // This is a simple test case that checks if the component instance was created successfully. If the component is created without any errors, this test will pass.
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
