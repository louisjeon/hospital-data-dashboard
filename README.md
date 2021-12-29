# 🏥 Hospital Dashboard

- Next JS와 Typescript, Chakra UI를 이용하여 만든 환자 정보 대쉬보드입니다.

## 구현 내용 설명

- 처음 PatientsTable 컴포넌트가 마운트 될 때 데이터를 받아와 allPatients, filteredPatients에 담아두고 최대 앞의 20항목을 잘라 patients에 담아둡니다. allPatients는 받아온 데이터 전체를 담아두어 필터조건이 변경될 때마다 사용하기 위한 용도이고 filteredPatients는 지금 필터처리가 되어 렌더할 환자 목록을 나타냅니다.

- 정렬 카테고리인 sortingCategory와 정렬 방향인 sortingDirection을 상태로 지정해 둘 중 하나라도 상태 변경 시 allPatients로부터 필터를 다시 돌려 filteredPatients에 할당합니다.

- setFilters라는 커스텀 훅을 이용해 필터 조건 중 하나라도 변경될 때마다 filteredPatients에 데이터를 새로 할당합니다.

- PieCharts 컴포넌트에서는 차트의 각각의 항목을 나타내는 RGB값을 할당하여 차트별로 돋보이도록 제작하였습니다.

- 페이징 및 이전 페이지 가기, 다음 페이지 가기, 맨 앞으로 가기, 맨 뒤로 가기 등을 조건에 맞을 때 렌더링되도록 구현하였습니다.

## git clone 후 실행

`yarn` 명령어를 통해 패키지들을 다운받은 후,

`yarn dev` 명령어를 통해 로컬 서버에서 실행이 가능합니다.

```bash
yarn

yarn dev
```
