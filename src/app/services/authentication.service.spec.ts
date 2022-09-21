import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;

  beforeEach(() => {

    let store:any = { };

    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string) => {
        store[key] = `${value}`;
      },
      removeItem: (key: string) => {
        delete store[key];
      },
      clear: () => {
        store = {};
      }
    };
    spyOn(localStorage, 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(localStorage, 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(localStorage, 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(localStorage, 'clear')
      .and.callFake(mockLocalStorage.clear);


    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AuthenticationService);

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);

    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('logging in successfully sets token an username', async () => {
    /*
    // Arrange
    let username = "test"
    let password = "supersecret"

    // Act

    await service.login(username, password);

    const testData = {username};

    // Make an HTTP POST request
    const postobs = httpClient.post<any>('https://learning-platform-server.azurewebsites.net/users/signin', {status: 200, body: testData}
    );

    postobs.subscribe(data =>
      expect(data).toEqual(testData));

    const req = httpMock.expectOne('https://learning-platform-server.azurewebsites.net/users/signin');

    // Assert

    expect(req.request.method).toEqual('POST');
    req.flush({username: username, password: password}, {status: 200, statusText: "success"});

    httpMock.verify();

    expect(localStorage.setItem).toHaveBeenCalledTimes(2)
    expect(localStorage.setItem).toHaveBeenCalledWith("username", "test")
    expect(localStorage.setItem).toHaveBeenCalledWith("token", "my-super-secret-token-from-server")
    */
  });

  it('should remove items when logging out', () => {
    // Arrange
    localStorage.setItem("token", "my-super-secret-token-from-server");
    localStorage.setItem("name", "fakename");

    // Act
    service.logout();

    // Assert
    expect(localStorage.removeItem).toHaveBeenCalledTimes(4)
    expect(localStorage.removeItem).toHaveBeenCalledWith("name")
    expect(localStorage.removeItem).toHaveBeenCalledWith("token")
    expect(localStorage.removeItem).toHaveBeenCalledWith("userId")
  });

  it('isUserLoggedIn should be true when logged in', () => {
    // Arrange
    localStorage.setItem("token", "my-super-secret-token-from-server");
    localStorage.setItem("name", "fakename");

    // Act
    let loggedIn = service.isUserLoggedIn();

    // Assert
    expect(localStorage.getItem).toHaveBeenCalledOnceWith("token")
    expect(loggedIn).toBeTruthy();
  });

  it('isUserLoggedIn should be false when logged in', () => {
    // Arrange

    // Act
    let loggedIn = service.isUserLoggedIn();

    // Assert
    expect(localStorage.getItem).toHaveBeenCalledOnceWith("token");
    expect(loggedIn).toBeFalsy();
  });

  it('getCurrentUser should return username', () => {
    // Arrange
    localStorage.setItem("token", "my-super-secret-token-from-server");
    localStorage.setItem("name", "batman is my name");

    // Act
    let username = service.getCurrentUser();

    // Assert
    expect(username).toEqual("batman is my name");
    expect(localStorage.getItem).toHaveBeenCalledWith("name")
  })
});
