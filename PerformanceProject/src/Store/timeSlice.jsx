import { createSlice, configureStore } from "@reduxjs/toolkit";
import dayjs from "dayjs";
const toleransBreakTime = 1800000; // YARIM SAAT : 30 DAKİKA SÜRESİ

const timeSlice = createSlice({
  name: "time",
  initialState: {
    days: {
      pazartesiTimes: [],
      saliTimes: [],
      carsambaTimes: [],
      persembeTimes: [],
      cumaTimes: [],
      cumartesiTimes: [],
      pazarTimes: [],
    },

    totalTimes: {
      pazartesiTotalTime: null,
      saliTotalTime: null,
      carsambaTotalTime: null,
      persembeTotalTime: null,
      cumaTotalTime: null,
      cumartesiTotalTime: null,
      pazarTotalTime: null,
    },

    workingHours: {
      pazartesi: 0,
      sali: 0,
      carsamba: 0,
      persembe: 0,
      cuma: 0,
      cumartesi: 0,
      pazar: 0,
    },
  },
  reducers: {
    addBeginTime: (state, action) => {
      const { day, n, time } = action.payload;

      if (!state.days[Object.keys(state.days)[day]][n]) {
        // gerekli günün n. değerinde ikili yoksa
        state.days[Object.keys(state.days)[day]].push([time, null]); // Gerekli günün n. değerine ikili ataması yap
      } else {
        //Gerekli günün n. değerinde ikili varsa
        var tmpTimes = state.days[Object.keys(state.days)[day]][n]; // Gerekli gündeki n. ikiliyi al
        tmpTimes[0] = time; // Gerekli gündeki n. ikiliden begintime'ı verilen değerle değiştir
        state.days[Object.keys(state.days)[day]][n] = tmpTimes; // değiştirilenm ikilileri geri ata
      } // direkt atanmamasının sebebi [0][0][0] şeklinde parantezlerden dolayı olmuyor o nedenle [0][0] -> değere atnmakta ve bunun [0]. elemanı şeklinde atanmakta

      timeSlice.caseReducers.calculateWorkingHour(state);
    },

    addEndTime: (state, action) => {
      const { day, n, time } = action.payload;

      if (!state.days[Object.keys(state.days)[day]][n]) {
        // gerekli günün n. değerinde ikili yoksa
        state.days[Object.keys(state.days)[day]].push([null, time]);
      } else {
        //Gerekli günün n. değerinde ikili varsa
        var tmpTimes = state.days[Object.keys(state.days)[day]][n];
        tmpTimes[1] = time;
        state.days[Object.keys(state.days)[day]][n] = tmpTimes;
      }
      timeSlice.caseReducers.calculateWorkingHour(state);
    },

    removeTimeAfterN: (state, action) => {
      const { day, n } = action.payload;

      if (state.days[Object.keys(state.days)[day]].length > n) {
        // Listenin uzunluğu n den büyüükse
        //state.days[Object.keys(state.days)[day]].splice(n); // Listeden n. elemandan sonraki tüm elemanları siliyor

        state.days[Object.keys(state.days)[day]].splice(n + 1);
      }

      timeSlice.caseReducers.calculateWorkingHour(state);
    },

    setTotalTime: (state, action) => {
      const { day, time } = action.payload;

      // Belirtilen gün için yeni bir totalTimes objesi oluşturun
      state.totalTimes[Object.keys(state.totalTimes)[day]] = time;

      // Mevcut durumun bir kopyasını oluşturun ve totalTimes objesini güncelleyin
      timeSlice.caseReducers.calculateWorkingHour(state);
    },

    resetState: (state) => {
      state.days = {
        pazartesiTimes: [],
        saliTimes: [],
        carsambaTimes: [],
        persembeTimes: [],
        cumaTimes: [],
        cumartesiTimes: [],
        pazarTimes: [],
      };

      state.totalTimes = {
        pazartesiTotalTime: null,
        saliTotalTime: null,
        carsambaTotalTime: null,
        persembeTotalTime: null,
        cumaTotalTime: null,
        cumartesiTotalTime: null,
        pazarTotalTime: null,
      };

      state.workingHours = {
        pazartesi: 0,
        sali: 0,
        carsamba: 0,
        persembe: 0,
        cuma: 0,
        cumartesi: 0,
        pazar: 0,
      };
    },

    calculateWorkingHour: (state) => {
      // Öğle arası saatleri ve mola süreleri
      const lunchBreakTimes = {
        pazartesiTimes: { start: "11:30", end: "13:30", maxBreakTime: 3600000 }, // 1 saat
        saliTimes: { start: "11:30", end: "13:30", maxBreakTime: 3600000 }, // 1 saat
        carsambaTimes: { start: "11:30", end: "13:30", maxBreakTime: 3600000 }, // 1 saat
        persembeTimes: { start: "11:30", end: "13:30", maxBreakTime: 3600000 }, // 1 saat
        cumaTimes: { start: "11:30", end: "14:30", maxBreakTime: 5400000 }, // 1.5 saat
        cumartesiTimes: { start: "11:30", end: "13:30", maxBreakTime: 3600000 }, // 1 saat
        pazarTimes: { start: "11:30", end: "13:30", maxBreakTime: 3600000 }, // 1 saat
      };

      for (var i = 0; i < Object.keys(state.days).length; i++) {
        var times = state.days[Object.keys(state.days)[i]];
        let time = 0;

        //TOTAL WORKİNG HOURS BOŞSA YANİ KULLANICI EN ÜSTTEKİ SAAT İBARESİYLE GÜNÜ TAMAMEN DOLDURMUYORSA AŞAĞIDAKİ GİRİŞ ÇIKIŞ SAATLERİNİ KULLANIYORSA BURAYA GİRİP HESAP YAPIYOR!
        if (state.totalTimes[Object.keys(state.totalTimes)[i]] == null) {
          for (var j = 0; j < times.length; j++) {
            if (times[j][0] != null && times[j][1] != null) {
              const start = dayjs(times[j][0]);
              const end = dayjs(times[j][1]);
              time += end - start;

              // Öğle molası kontrolü --> BUNUN DÜZELTİLMESİ LAZIM BURASI HATALI SADECE
              // Öğle molası kontrolü --> BUNUN DÜZELTİLMESİ LAZIM BURASI HATALI SADECE
              //TODO//TODO//TODO//TODO//TODO//TODO//TODO//TODO//TODO -->ÖĞLE ARASI KONTROLÜ YAZAMADIM 30 dk kontrolü ile çakışıyor hem tam anlamadım
              // times[j][0] - times[j - 1][1]; // n+1. giriş saati ile n. çıkış saati farkı --> Bu şekilde 1. çıkış ile 2. girişin kıyasını yapmam gerekiyor
              // 1. çıkış ve 2. giriş öğle arası saatlerinde ise örneğin 1 saatlik bir listeden azalmalı öğle arası saatlerinde sadece bu şekilde hesap yapılmalı bu
              // 1 SAATLİK MOLA HAKKI BİTTİĞİNDE ve GİRİLEN DEĞERLER ÖĞLE ARASI SAATLERİNDE DEĞİLSE normal hesaplamaya dönülebilir belki
              const dayKey = Object.keys(state.days)[i];
              console.log(dayKey);
              //const formattedStart = start.format("HH:mm");
              //const formattedEnd = end.format("HH:mm");
              //console.log(formattedStart);
              //console.log(formattedEnd);
              if (j > 0) {
                const prevEnd = dayjs(times[j - 1][1]);
                const nextStart = start;

                const lunchBreakStart = dayjs(`${prevEnd.format("YYYY-MM-DD")} ${lunchBreakTimes[dayKey].start}`);
                const lunchBreakEnd = dayjs(`${prevEnd.format("YYYY-MM-DD")} ${lunchBreakTimes[dayKey].end}`);
                console.log("lunch start and end");
                console.log(lunchBreakStart);
                console.log(lunchBreakEnd);

                //TODO burada sıkıntı giriş çıkışta eklediği 30 dakika ile öğle arasındaki 30 dakikayı geçen durumlarda eklediği 1 saat çakışıyor yani 1 saat 30 dakika ekliyor bazen
                //times[j][0] - times[j - 1][1] > toleransBreakTime --> saat farkının öğle arasında 30 dk dan büyük olması gerekiyor
                if ((prevEnd.isAfter(lunchBreakStart) || prevEnd.isSame(lunchBreakStart)) && (nextStart.isBefore(lunchBreakEnd) || nextStart.isSame(lunchBreakEnd)) && times[j][0] - times[j - 1][1] > toleransBreakTime) {
                  let lunchBreakOverlap = 0;
                  console.log("prev end and next start");
                  console.log(prevEnd);
                  console.log(nextStart);

                  if (prevEnd.isBefore(lunchBreakStart)) {
                    lunchBreakOverlap = lunchBreakEnd.diff(lunchBreakStart);
                  } else if (prevEnd.isBefore(lunchBreakEnd)) {
                    lunchBreakOverlap = lunchBreakEnd.diff(prevEnd);
                  }

                  if (nextStart.isBefore(lunchBreakEnd)) {
                    lunchBreakOverlap -= lunchBreakEnd.diff(nextStart);
                  }

                  time += Math.min(lunchBreakOverlap, lunchBreakTimes[dayKey].maxBreakTime);
                }
              }
              //TODO//TODO//TODO//TODO//TODO//TODO//TODO//TODO//TODO -->ÖĞLE ARASI KONTROLÜ YAZAMADIM 30 dk kontrolü ile çakışıyor hem tam anlamadım
              // Öğle molası kontrolü --> BUNUN DÜZELTİLMESİ LAZIM BURASI HATALI SADECE
              // Öğle molası kontrolü --> BUNUN DÜZELTİLMESİ LAZIM BURASI HATALI SADECE

              // Arka Arkaya giriş çıkış kontrolü
              // ŞİRKETTEN ÇIKIŞLARDA EĞER KİŞİ 30 DAKİKADAN AZ MOLA VERİYORSA MESELA 18.30 DA ÇIKTI 18.59 DA GİRDİ MOLA SAYILIYOR O NEDENLE BU SÜREYİ WORKİNG HOURSA EKLEDİM
              if (j - 1 >= 0) {
                let diffTime = times[j][0] - times[j - 1][1]; // n+1. giriş saati ile n. çıkış saati farkı
                if (diffTime <= toleransBreakTime) {
                  // Eğer fark 30 dan küçük ve eşitse direkt zamana o fark eklenmektedir şirkette 30 dk molalara izin vardır
                  time += diffTime;
                } else {
                  // Eğer fark 30 dan büyükse örneğin 36 dakika mola yaptıysa kişi o zaman 30 dakika eklenmekte ve 6 dakika eksik sayılmaktadır.,
                  // Örneğin ben 13.00 da çıktım 13.36 da giriş yaptım ise 6 dakika eksik vardır
                  time += toleransBreakTime; // 30 dakika toleransı ekle
                }
              }
            }
          }
        } else {
          //EĞER TOTAL TİME'A DEĞER GİRDİYSE DİREKT O GÜNÜN ÇALIŞMA SAATİ O OLUYOR
          let date = dayjs(state.totalTimes[Object.keys(state.totalTimes)[i]]);
          let ms = dayjs.duration({ hours: date.hour(), minutes: date.minute() }).asMilliseconds();
          time = ms;
        }

        state.workingHours[Object.keys(state.workingHours)[i]] = time;
      }
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
export const workingHours = (state) => state.time.workingHours;
export default timeSlice.reducer;
