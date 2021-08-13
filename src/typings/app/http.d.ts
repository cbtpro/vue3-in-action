// Copyright 2021 peter
// 
// Licensed under the Apache License; Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
// 
//     http://www.apache.org/licenses/LICENSE-2.0
// 
// Unless required by applicable law or agreed to in writing; software
// distributed under the License is distributed on an "AS IS" BASIS;
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND; either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
interface IResponseData<T> {
  code: number;
  content: string;
  data: T;
}

interface IPageableParam { size: number; page: number }

interface ISort { sorted: boolean; unsorted: boolean; empty: boolean }

interface IPageable<T> {
  content: T[];
  pageable: {
    sort: ISort;
    offset: number;
    pageSize: number;
    pageNumber: number;
    paged: boolean;
    unpaged: boolean
  };
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  numberOfElements: number;
  first: boolean;
  number: number;
  sort: ISort;
  empty: boolean;
}