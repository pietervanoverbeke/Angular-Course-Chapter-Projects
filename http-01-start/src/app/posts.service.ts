import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { catchError, map, tap } from "rxjs/operators";
import { Subject, throwError } from "rxjs";

const BASE_URL = 'https://ng-complete-guide-77e4d-default-rtdb.europe-west1.firebasedatabase.app/'

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    error = new Subject<string>()

    constructor(private http: HttpClient) {}

    createAndStorePost(title: string, content: string) {
        const postData: Post = {
            title,
            content
        }

        this.http.post<{ name: string }>(
            BASE_URL+'posts.json', 
            postData,
            {
                observe: 'response'
            }
        )
        .subscribe(data => {
            console.log(data);
        }, error => {
            this.error.next(error.message)
        })
    }

    fetchPosts() {
        let searchParams = new HttpParams()
        searchParams = searchParams.append('print', 'pretty')
        searchParams = searchParams.append('custom', 'key')

        return this.http.get<{ [key: string]: Post }>(BASE_URL+'posts.json',
        {
            headers: new HttpHeaders({
                'custom-header': 'test'
            }),
            params: searchParams,//new HttpParams().set('print', 'pretty')
            responseType: 'json'
        })
            .pipe(
                map((data) => {
                    const postsArray: Post[] = []
                    for (const key in data) {
                        if (data.hasOwnProperty(key))
                        postsArray.push({...data[key], id: key})
                    }
                    return postsArray
                }),
                catchError(error => {
                    //do something with erorr
                    //Can also throw custom error below
                    return throwError(error);
                })
            )
    }

    clearPosts() {
        return this.http.delete(BASE_URL+'posts.json', 
        {
            observe: 'events',
            responseType: 'text'
        }).pipe(tap(event => {
            console.log(event);
            if (event.type === HttpEventType.Response) {
                console.log(event.body);
                
            }
        }))
    }
}