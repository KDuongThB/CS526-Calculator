# React Native Calculator App
## Note:
Nhóm tụi em có nhận được sự chỉ dẫn từ anh Nguyễn Tam Điệp về phần xử lý dữ liệu khi nhập từ bàn phím. Hiện tại anh ấy đã vào nhóm của tụi em nhưng trước khi vào nhóm anh đã code xong bài Calculator của riêng mình nên tụi em quyết định giữ lại cả 2 app Calculator (sau này sẽ gộp lại). Link github code Calculator của anh anh Nguyễn Tam Điệp: 
https://github.com/nguyentamdiep/CalculatorApp 


## Team members:
Nhóm 4: 
| No.  | Name                | Student ID | Email                | github username| 
| -----| --------------------| ---------- |----------------------|----------------|
| 1    |Pham Tan Tai         |20521861    |20521861@gm.uit.edu.vn|tai040102    |
| 2    |Duong Thanh Bao Khanh|20521444    |20521444@gm.uit.edu.vn|kduongthb       |
| 3    |Tran Thi My Quyen    |20520731    |20520731@gm.uit.edu.vn|AzaleaBrowns    |
| 4    |Nguyen Tam Diep      |19521360    |19521360@gm.uit.edu.vn|nguyentamdiep                |

## How to test and debug this app using Expo:
### Prerequisites: 
1. install android-sdk, git, Nodejs >=14, npm and expo-cli on your debugging device
2. install Expo Go on your android device or emulator
3. Enable Android debugging bridge on your android device/emulator and connect it to the debugging device.
### Instruction:

with npm:

* Step 1: Clone the repository

```
git clone https://github.com/KDuongThB/CS526-Calculator.git
cd ./calculator
npm install
npm install @react-navigation/native
npm install @react-navigation/native-stack
npm install react-native-screens react-native-safe-area-context

``` 
* Step 2: run the Expo-cli to start debugging
```
expo start --android
```
* Step 3: enjoy

with yarn:
```
git clone https://github.com/KDuongThB/CS526-Calculator.git

cd CalculatorApp

yarn install

yarn add @react-navigation/native @react-navigation/native-stack

yarn add react-native-screens react-native-safe-area-context

yarn start
```


