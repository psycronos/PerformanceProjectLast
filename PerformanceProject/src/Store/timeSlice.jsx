import { createSlice, configureStore } from "@reduxjs/toolkit";
import dayjs from "dayjs";
const toleransBreakTime = 1800000; // YARIM SAAT : 30 DAKİKA SÜRESİ

const timeSlice = createSlice({
  name: "time",
  initialState: {
    // Gerekli
    days: {
      pazarTimes: [],
      pazartesiTimes: [],
      saliTimes: [],
      carsambaTimes: [],
      persembeTimes: [],
      cumaTimes: [],
      cumartesiTimes: [],
    },
    // Gerekli
    totalTimes: {
      pazarTotalTime: null,
      pazartesiTotalTime: null,
      saliTotalTime: null,
      carsambaTotalTime: null,
      persembeTotalTime: null,
      cumaTotalTime: null,
      cumartesiTotalTime: null,
    },
  },
  reducers: {
    addBeginTime: (state, action) => {
      const { day, n, time } = action.payload;

      var fixedTime = time;
      // gelen zamanı haftanın gününe göre ayarla
      if (fixedTime) {
        // Eğer gelen time değeri varsa dayjs objesine çevir
        fixedTime = dayjs(fixedTime);
        fixedTime = fixedTime.add(day - fixedTime.day(), "day");
        fixedTime = fixedTime.valueOf();
      }

      if (!state.days[Object.keys(state.days)[day]][n]) {
        // gerekli günün n. değerinde ikili yoksa
        state.days[Object.keys(state.days)[day]].push([fixedTime, null]); // Gerekli günün n. değerine ikili ataması yap
      } else {
        //Gerekli günün n. değerinde ikili varsa
        var tmpTimes = state.days[Object.keys(state.days)[day]][n]; // Gerekli gündeki n. ikiliyi al
        tmpTimes[0] = fixedTime; // Gerekli gündeki n. ikiliden begintime'ı verilen değerle değiştir
        state.days[Object.keys(state.days)[day]][n] = tmpTimes; // değiştirilenm ikilileri geri ata
      } // direkt atanmamasının sebebi [0][0][0] şeklinde parantezlerden dolayı olmuyor o nedenle [0][0] -> değere atnmakta ve bunun [0]. elemanı şeklinde atanmakta

      //timeSlice.caseReducers.calculateWorkingHour(state); //kendi içinde fonksiyon çağırmak için caseReducers kullanılıyor
    },

    addEndTime: (state, action) => {
      const { day, n, time } = action.payload;

      var fixedTime = time;

      if (fixedTime) {
        // Eğer gelen time değeri varsa dayjs objesine çevir
        fixedTime = dayjs(fixedTime);
        fixedTime = fixedTime.add(day - fixedTime.day(), "day");
        fixedTime = fixedTime.valueOf();
      }

      if (!state.days[Object.keys(state.days)[day]][n]) {
        // gerekli günün n. değerinde ikili yoksa
        state.days[Object.keys(state.days)[day]].push([null, fixedTime]);
      } else {
        //Gerekli günün n. değerinde ikili varsa
        var tmpTimes = state.days[Object.keys(state.days)[day]][n];
        tmpTimes[1] = fixedTime;
        state.days[Object.keys(state.days)[day]][n] = tmpTimes;
      }
      //timeSlice.caseReducers.calculateWorkingHour(state);
    },

    removeTimeAfterN: (state, action) => {
      const { day, n } = action.payload;

      if (state.days[Object.keys(state.days)[day]].length > n) {
        // Listenin uzunluğu n den büyüükse
        //state.days[Object.keys(state.days)[day]].splice(n); // Listeden n. elemandan sonraki tüm elemanları siliyor

        state.days[Object.keys(state.days)[day]].splice(n + 1);
      }

      //timeSlice.caseReducers.calculateWorkingHour(state);
    },

    setTotalTime: (state, action) => {
      const { day, time } = action.payload;

      var fixedTime = time;
      // gelen zamanı haftanın gününe göre ayarla
      if (fixedTime) {
        // Eğer gelen time değeri varsa dayjs objesine çevir
        fixedTime = dayjs(fixedTime);
        fixedTime = fixedTime.add(day - fixedTime.day(), "day");
        fixedTime = fixedTime.valueOf();
      }

      // Belirtilen gün için yeni bir totalTimes objesi oluşturun
      state.totalTimes[Object.keys(state.totalTimes)[day]] = fixedTime;

      // Mevcut durumun bir kopyasını oluşturun ve totalTimes objesini güncelleyin
      //timeSlice.caseReducers.calculateWorkingHour(state);
    },

    resetState: (state) => {
      state.days = {
        pazarTimes: [],
        pazartesiTimes: [],
        saliTimes: [],
        carsambaTimes: [],
        persembeTimes: [],
        cumaTimes: [],
        cumartesiTimes: [],
      };

      state.totalTimes = {
        pazarTotalTime: null,
        pazartesiTotalTime: null,
        saliTotalTime: null,
        carsambaTotalTime: null,
        persembeTotalTime: null,
        cumaTotalTime: null,
        cumartesiTotalTime: null,
      };
    },
  },
});

//TODO //TODO //TODO
//TODO //TODO //TODO
//TODO //TODO //TODO
//TODO //TODO //TODO
//TODO //TODO //TODO
//TODO //TODO //TODO

// 1. BURAYA BİRTANE CALCULATE FONKSİYONU EKLENECEK ŞUAN LİSTELER DOĞRU ŞEKİLDE ALINIYOR
// 30 dakiakyı  geçmiyorsa mesaide sayılacak
// son olarak cuma öğle arası 12.30-14.30 arası 1.30 saat

//TODO HÜSEYİN TAVSİYE --> DURUM KÜTÜPHANESİ NE İNCELE VE ONU ANLA
//TODO HÜSEYİN TAVSİYE --> DURUM KÜTÜPHANESİ NE İNCELE VE ONU ANLA
//TODO //TODO //TODO
//TODO //TODO //TODO
//TODO //TODO //TODO
//TODO //TODO //TODO
//TODO //TODO //TODO
//TODO //TODO //TODO

export const { diffTimeAdd, addBeginTime, addEndTime, removeTimeAfterN, resetState, setTotalTime } = timeSlice.actions;
export const days = (state) => state.time.days;
export const totalTimes = (state) => state.time.totalTimes;
export default timeSlice.reducer;
