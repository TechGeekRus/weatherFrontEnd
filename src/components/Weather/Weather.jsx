// // import './Weather.css'
// import React from 'react'
// import { useEffect, useState } from 'react'
// import axios from 'axios'

// const WEATHER_BASE_URL = 'https://api.weatherapi.com/v1'

// function RealTimeApi() {
//   const [location, setLocation] = useState('Memphis')
//   const [weatherData, setWeatherData] = useState(null)
//   const [input, setInput] = useState('')

//   useEffect(() => {
//     fetchCurrentWeather(location)
//   }, [location])

//   async function fetchCurrentWeather(loc) {
//     try {
//       const response = await axios.get(
//         `${BASE_URL}/current.json?key=${weatherAPI}&q=${loc}`
//       );
//       setWeatherData(response.data)
//     } catch (error) {
//       console.error('Error fetching current weather:', error)
//       setWeatherData(null)
//     }
//   }

//   function handleSearch() {
//     if (input.trim() !== '') {
//       setLocation(input.trim())
//     }
//   }

//   return (
//     <div>
//       <h2>RealTimeApi</h2>
//       <input
//         type="text"
//         placeholder="Enter location"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//       />
//       <button onClick={handleSearch}>Search</button>

//       {weatherData ? (
//         <div>
//           <h3>{weatherData.location.name}, {weatherData.location.region}</h3>
//           <p>Temperature: {weatherData.current.temp_c}°C</p>
//           <p>Condition: {weatherData.current.condition.text}</p>
//           <img
//             src={weatherData.current.condition.icon}
//             alt={weatherData.current.condition.text}
//           />
//           <p>Humidity: {weatherData.current.humidity}%</p>
//           <p>Wind: {weatherData.current.wind_kph} kph</p>
//         </div>
//       ) : (
//         <p>No data available for "{location}"</p>
//       )}
//     </div>
//   );
// }

// function ForeCastAPI() {
//   const [location, setLocation] = useState('Memphis')
//   const [forecastData, setForecastData] = useState(null)
//   const [input, setInput] = useState('')
//   const [days, setDays] = useState(7)

//   useEffect(() => {
//     fetchForecast(location, days)
//   }, [location, days])

//   async function fetchForecast(loc, days) {
//     try {
//       const response = await axios.get(
//         `${BASE_URL}/forecast.json?key=${weatherAPI}&q=${loc}&days=${days}&aqi=no&alerts=no`
//       );
//       setForecastData(response.data)
//     } catch (error) {
//       console.error('Error fetching forecast:', error);
//       setForecastData(null);
//     }
//   }

//   function handleSearch() {
//     if (input.trim() !== '') {
//       setLocation(input.trim())
//     }
//   }

//   function handleDaysChange(e) {
//     setDays(Number(e.target.value))
//   }

//   return (
//     <div>
//       <h2>ForeCastAPI</h2>
//       <input
//         type="text"
//         placeholder="Enter location"
//         value={input}
//         onChange={(e) => setInput(e.target.value)}
//       />
//       <button onClick={handleSearch}>Search</button>

//       <label>
//         Days:
//         <select value={days} onChange={handleDaysChange}>
//           {[1, 2, 3, 4, 5, 6, 7].map((d) => (
//             <option key={d} value={d}>
//               {d}
//             </option>
//           ))}
//         </select>
//       </label>

//       {forecastData ? (
//         <div>
//           <h3>
//             Forecast for {forecastData.location.name}, {forecastData.location.region}
//           </h3>
//           {forecastData.forecast.forecastday.map((day) => (
//             <div key={day.date} style={{ borderBottom: '1px solid #ccc', marginBottom: '8px' }}>
//               <strong>{day.date}</strong>
//               <p>Avg Temperature: {day.day.avgtemp_c}°C</p>
//               <p>Condition: {day.day.condition.text}</p>
//               <img src={day.day.condition.icon} alt={day.day.condition.text} />
//               <p>Max Wind: {day.day.maxwind_kph} kph</p>
//               <p>Chance of rain: {day.day.daily_chance_of_rain}%</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>No forecast data available for "{location}"</p>
//       )}
//     </div>
//   );
// }

// export default function WeatherApp() {
//   return (
//     <div style={{ padding: '20px' }}>
//       <h1>Weather App</h1>
//       <RealTimeApi />
//       <hr />
//       <ForeCastAPI />
//     </div>
//   )
// }
// import React from 'react'
import React, { useEffect, useState, useRef } from 'react'
import axios from 'axios'

export function RealTimeApi() {
  const [location, setLocation] = useState('Memphis')
  const [weatherData, setWeatherData] = useState(null)
  const [input, setInput] = useState('')

  useEffect(() => {
    fetchCurrentWeather(location)
  }, [location]);

  async function fetchCurrentWeather(loc) {
    try {
      const response = await axios.get('/api/weather/current', {
        params: { q: loc },
      });
      setWeatherData(response.data)
    } catch (error) {
      console.error('Error fetching current weather:', error)
      setWeatherData(null)
    }
  }

  function handleSearch() {
    if (input.trim() !== '') {
      setLocation(input.trim())
    }
  }

  return (
    <div>
      <h2>Real-Time Weather</h2>
      <input
        type="text"
        placeholder="Enter location"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {weatherData && weatherData.location && weatherData.current ? (
        <div>
          <h3>
            {weatherData.location.name}, {weatherData.location.region}
          </h3>
          <p>Temperature: {weatherData.current.temp_c}°C</p>
          <p>Condition: {weatherData.current.condition.text}</p>
          <img
            src={weatherData.current.condition.icon}
            alt={weatherData.current.condition.text}
          />
          <p>Humidity: {weatherData.current.humidity}%</p>
          <p>Wind: {weatherData.current.wind_kph} kph</p>
        </div>
      ) : (
        <p>No data available for "{location}"</p>
      )}
    </div>
  )
}

export function ForeCastAPI() {
  const [location, setLocation] = useState('Memphis')
  const [forecastData, setForecastData] = useState(null)
  const [input, setInput] = useState('')
  const [days, setDays] = useState(3)

  useEffect(() => {
    fetchForecast(location, days)
  }, [location, days]);

  async function fetchForecast(loc, daysCount) {
    try {
      const response = await axios.get('/api/weather/forecast', {
        params: { q: loc, days: daysCount },
      });
      // console.log(response.data)
      // console.log(data)
      setForecastData(response.data);
    } catch (error) {
      console.error('Error fetching forecast:', error)
      setForecastData(null);
    }
  }

  function handleSearch() {
    if (input.trim() !== '') {
      setLocation(input.trim())
    }
  }

  function handleDaysChange(e) {
    setDays(Number(e.target.value))
  }

  return (
    <div>
      <h2>Weather Forecast</h2>
      <input
        type="text"
        placeholder="Enter location"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <label>
        Days:
        <select value={days} onChange={handleDaysChange}>
          {[1, 2, 3].map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>
      </label>

      {forecastData &&
      forecastData.location &&
      forecastData.forecast &&
      forecastData.forecast.forecastday ? (
        <div>
          <h3>
            Forecast for {forecastData.location.name}, {forecastData.location.region}
          </h3>
          {forecastData.forecast.forecastday.map((day) => (
            <div
              key={day.date}
              style={{ borderBottom: '1px solid #ccc', marginBottom: '8px' }}
            >
              <strong>{day.date}</strong>
              <p>Avg Temperature: {day.day.avgtemp_c}°C</p>
              <p>Condition: {day.day.condition.text}</p>
              <img src={day.day.condition.icon} alt={day.day.condition.text} />
              <p>Max Wind: {day.day.maxwind_kph} kph</p>
              <p>Chance of rain: {day.day.daily_chance_of_rain}%</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No forecast data available for "{location}"</p>
      )}
    </div>
  );
}

export function BirdAnimation() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const Bird = {
      def: function (n, m, s) {
        if (m) this.e(n.prototype, m);
        if (s) this.e(n, s);
        return n;
      },
      e: function (o, p) {
        for (const prop in p) o[prop] = p[prop];
        return o;
      },
      v: [
        [5, 0, 0],
        [-5, -2, 1],
        [-5, 0, 0],
        [-5, -2, -1],
        [0, 2, -6],
        [0, 2, 6],
        [2, 0, 0],
        [-3, 0, 0],
      ],
      beak: [
        [0, 1, 2],
        [4, 7, 6],
        [5, 6, 7],
      ],
      L: null,
      V: {
        x: 0,
        y: 0,
        z: 5000,
      },
      Matrix: {
        rotX: function (pt, angX) {
          const pos = [pt.x, pt.y, pt.z];
          const asin = Math.sin(angX);
          const acos = Math.cos(angX);
          const xrot = [];
          xrot[0] = [1, 0, 0];
          xrot[1] = [0, acos, asin];
          xrot[2] = [0, -asin, acos];
          const calc = this.mm(pos, xrot);
          pt.x = calc[0];
          pt.y = calc[1];
          pt.z = calc[2];
        },
        rotY: function (pt, angY) {
          const pos = [pt.x, pt.y, pt.z];
          const asin = Math.sin(angY);
          const acos = Math.cos(angY);
          const yrot = [];
          yrot[0] = [acos, 0, asin];
          yrot[1] = [0, 1, 0];
          yrot[2] = [-asin, 0, acos];
          const calc = this.mm(pos, yrot);
          pt.x = calc[0];
          pt.y = calc[1];
          pt.z = calc[2];
        },
        rotZ: function (pt, angZ) {
          const pos = [pt.x, pt.y, pt.z];
          const asin = Math.sin(angZ);
          const acos = Math.cos(angZ);
          const yrot = [];
          yrot[0] = [acos, asin, 0];
          yrot[1] = [-asin, acos, 0];
          yrot[2] = [0, 0, 1];
          const calc = this.mm(pos, yrot);
          pt.x = calc[0];
          pt.y = calc[1];
          pt.z = calc[2];
        },
        trans: function (pt, s) {
          pt.x += s[0];
          pt.y += s[1];
          pt.z += s[2];
        },
        scale: function (pt, s) {
          pt.x *= s[0];
          pt.y *= s[1];
          pt.z *= s[2];
        },
        mm: function (m1, m2) {
          const calc = [];
          calc[0] = m1[0] * m2[0][0] + m1[1] * m2[1][0] + m1[2] * m2[2][0];
          calc[1] = m1[0] * m2[0][1] + m1[1] * m2[1][1] + m1[2] * m2[2][1];
          calc[2] = m1[0] * m2[0][2] + m1[1] * m2[1][2] + m1[2] * m2[2][2];
          return calc;
        },
      },
    };

    Bird.obj = Bird.def(
      function () {
        this.vtr = new Bird.Vtr();
        this.accel = undefined;
        this.width = 600;
        this.height = 600;
        this.depth = 300;
        this.ept = undefined;
        this.area = 200;
        this.msp = 4;
        this.mfrc = 0.1;
        this.coll = false;
        this.pos = new Bird.Vtr();
        this.vel = new Bird.Vtr();
        this.accel = new Bird.Vtr();
      },
      {
        _coll: function (value) {
          this.coll = value;
        },
        param: function (w, h, dth) {
          this.width = w;
          this.height = h;
          this.depth = dth;
        },
        run: function (b) {
          if (this.coll) {
            this.vtr.set(-this.width, this.pos.y, this.pos.z);
            let vtrTmp = this.detect(this.vtr);
            vtrTmp.scale(5);
            this.accel.add(vtrTmp);
            this.vtr.set(this.width, this.pos.y, this.pos.z);
            vtrTmp = this.detect(this.vtr);
            vtrTmp.scale(5);
            this.accel.add(vtrTmp);
            this.vtr.set(this.pos.x, -this.height, this.pos.z);
            vtrTmp = this.detect(this.vtr);
            vtrTmp.scale(5);
            this.accel.add(vtrTmp);
            this.vtr.set(this.pos.x, this.height, this.pos.z);
            vtrTmp = this.detect(this.vtr);
            vtrTmp.scale(5);
            this.accel.add(vtrTmp);
            this.vtr.set(this.pos.x, this.pos.y, -this.depth);
            vtrTmp = this.detect(this.vtr);
            vtrTmp.scale(5);
            this.accel.add(vtrTmp);
            this.vtr.set(this.pos.x, this.pos.y, this.depth);
            vtrTmp = this.detect(this.vtr);
            vtrTmp.scale(5);
            this.accel.add(vtrTmp);
          }
          if (Math.random() > 0.5) {
            this.fly(b);
          }
          this.move();
        },
        fly: function (b) {
          if (this.ept) {
            this.accel.add(this.meet(this.ept, 0.005));
          }
          this.accel.add(this.line(b));
          this.accel.add(this.togeth(b));
          this.accel.add(this.apart(b));
        },
        move: function () {
          this.vel.add(this.accel);
          const l = this.vel.len();
          if (l > this.msp) {
            this.vel.lowscale(l / this.msp);
          }
          this.pos.add(this.vel);
          this.accel.set(0, 0, 0);
        },
        detect: function (pt) {
          const dir = new Bird.Vtr();
          dir.copy(this.pos);
          dir.sub(pt);
          dir.scale(1 / this.pos.dsq(pt));
          return dir;
        },
        rep: function (pt) {
          const dist = this.pos.dst(pt);
          if (dist < 150) {
            const dir = new Bird.Vtr();
            dir.subv(this.pos, pt);
            dir.scale(0.5 / dist);
            this.accel.add(dir);
          }
        },
        meet: function (pt, amt) {
          const dir = new Bird.Vtr();
          dir.subv(pt, this.pos);
          dir.scale(amt);
          return dir;
        },
        line: function (b) {
          let _b;
          const totvel = new Bird.Vtr();
          let cnt = 0;
          for (let i = 0, il = b.length; i < il; i++) {
            if (Math.random() > 0.6) continue;
            _b = b[i];
            const dist = _b.pos.dst(this.pos);
            if (dist > 0 && dist <= this.area) {
              totvel.add(_b.vel);
              cnt++;
            }
          }
          if (cnt > 0) {
            totvel.lowscale(cnt);
            const v = totvel.len();
            if (v > this.mfrc) {
              totvel.lowscale(v / this.mfrc);
            }
          }
          return totvel;
        },
        togeth: function (b) {
          let _b;
          let dist;
          const plus = new Bird.Vtr();
          const dir = new Bird.Vtr();
          let cnt = 0;
          for (let i = 0, il = b.length; i < il; i++) {
            if (Math.random() > 0.6) continue;
            _b = b[i];
            dist = _b.pos.dst(this.pos);
            if (dist > 0 && dist <= this.area) {
              plus.add(_b.pos);
              cnt++;
            }
          }
          if (cnt > 0) {
            plus.lowscale(cnt);
          }
          dir.subv(plus, this.pos);
          const l = dir.len();
          if (l > this.mfrc) {
            dir.lowscale(l / this.mfrc);
          }
          return dir;
        },
        apart: function (b) {
          let _b;
          let dist;
          const plus = new Bird.Vtr();
          const rep = new Bird.Vtr();
          for (let i = 0, il = b.length; i < il; i++) {
            if (Math.random() > 0.6) continue;
            _b = b[i];
            dist = _b.pos.dst(this.pos);
            if (dist > 0 && dist <= this.area) {
              rep.subv(this.pos, _b.pos);
              rep.level();
              rep.lowscale(dist);
              plus.add(rep);
            }
          }
          return plus;
        },
      }
    );

    Bird.Build = Bird.def(
      function () {
        this.base = 0;
        this.left = 1;
        this.right = 2;
        this.pos = new Bird.Vtr();
        this.rot = new Bird.Vtr();
        this.bbase = this.tri(this.base);
        this.leftwing = this.tri(this.left);
        this.rightwing = this.tri(this.right);
        this.wY = 0;
      },
      {
        matrix: function () {
          this.bbase.vtx();
          this.leftwing.vtx();
          this.rightwing.vtx();
          this.leftwing.wingY(this.wY);
          this.rightwing.wingY(this.wY);
          this.bbase.rotY(this.rot.y);
          this.bbase.rotZ(this.rot.z);
          this.leftwing.rotY(this.rot.y);
          this.leftwing.rotZ(this.rot.z);
          this.rightwing.rotY(this.rot.y);
          this.rightwing.rotZ(this.rot.z);
          this.bbase.trans(this.pos);
          this.leftwing.trans(this.pos);
          this.rightwing.trans(this.pos);
        },
        draw: function () {
          this.bbase.draw();
          this.leftwing.draw();
          this.rightwing.draw();
        },
        tri: function (i) {
          let v1, v2, v3, v;
          v = Bird.v[Bird.beak[i][0]];
          v1 = new Bird.Vtr(v[0], v[1], v[2]);
          v = Bird.v[Bird.beak[i][1]];
          v2 = new Bird.Vtr(v[0], v[1], v[2]);
          v = Bird.v[Bird.beak[i][2]];
          v3 = new Bird.Vtr(v[0], v[1], v[2]);
          return new Bird.Tri(v1, v2, v3);
        },
        wang: function (y) {
          const v1 = Bird.v[Bird.beak[1][1]];
          this.rot.x = Math.atan2(y, v1[0]);
        },
        zpos: function () {
          const z1 = this.bbase._z();
          const z2 = this.leftwing._z();
          const z3 = this.rightwing._z();
          return Math.min(z1, z2, z3);
        },
        wing: function (y) {
          this.wY = y;
        },
      }
    );

    Bird.Tri = Bird.def(
      function (p1, p2, p3) {
        this.mainv = [p1.copy(), p2.copy(), p3.copy()];
        this.Vtxs = [p1.copy(), p2.copy(), p3.copy()];
        this.bv = new Bird.Vtr(0.5, 0.5, 0.8);
      },
      {
        draw: function () {
          const v1 = [this.Vtxs[0].Pt().x, this.Vtxs[0].Pt().y];
          const v2 = [this.Vtxs[1].Pt().x, this.Vtxs[1].Pt().y];
          const v3 = [this.Vtxs[2].Pt().x, this.Vtxs[2].Pt().y];
          const col = this.col();
          Bird.$.fillStyle = col;
          Bird.$.strokeStyle = col;
          Bird.$.lineWidth = 0.1;
          Bird.$.beginPath();
          Bird.$.moveTo(v1[0], v1[1]);
          Bird.$.lineTo(v2[0], v2[1]);
          Bird.$.lineTo(v3[0], v3[1]);
          Bird.$.lineTo(v1[0], v1[1]);
          Bird.$.closePath();
          Bird.$.fill();
          Bird.$.stroke();
        },
        rotX: function (a) {
          const ang = a;
          this.Vtxs.forEach(function (e) {
            Bird.Matrix.rotX(e, ang);
          });
        },
        rotY: function (a) {
          const ang = a;
          this.Vtxs.forEach(function (e) {
            Bird.Matrix.rotY(e, ang);
          });
        },
        rotZ: function (a) {
          const ang = a;
          this.Vtxs.forEach(function (e) {
            Bird.Matrix.rotZ(e, ang);
          });
        },
        trans: function (s) {
          const trans = s;
          this.Vtxs.forEach(function (e) {
            Bird.Matrix.trans(e, [trans.x, trans.y, trans.z]);
          });
        },
        vtx: function () {
          for (let i = 0; i < 3; i++) {
            const x = this.mainv[i].x;
            const y = this.mainv[i].y;
            const z = this.mainv[i].z;
            this.Vtxs[i].x = x;
            this.Vtxs[i].y = y;
            this.Vtxs[i].z = z;
          }
        },
        wingY: function (y) {
          this.Vtxs[0].y = y;
        },
        _z: function () {
          return Math.min(this.Vtxs[0].z, this.Vtxs[1].z, this.Vtxs[2].z);
        },
        col: function () {
          const e = 0.3,
            f = 0.3,
            g = 0.7;
          const bw = new Bird.Vtr(1, 1, 1);
          const n = this.norm();
          let x = this.Vtxs[0].copy();
          let v = x.sub(Bird.V);
          v.level();
          x = this.Vtxs[0].copy();
          let l = x.sub(Bird.L);
          l.level();
          let p = l.p(n);
          let x1 = n.copy();
          x1.scale(p);
          x1.scale(2);
          let r = l.copy();
          r.sub(x1);
          x1.scale(-1);
          p = Math.max(x1.p(l), 0);
          let col = this.bv.copy();
          col.scale(p);
          col.scale(col, e);
          x1 = col.copy();
          let x2 = r.copy();
          x2.scale(-1);
          p = Math.pow(Math.max(x2.p(v)), 20);
          x2 = bw.copy();
          x2.scale(p * f);
          let x3 = this.bv.copy();
          x3.scale(g);
          x1.add(x2);
          x1.add(x3);
          const _r = Math.floor(x1.x * 255);
          const _g = Math.floor(x1.y * 255);
          const _b = Math.floor(x1.z * 255);
          return 'rgb(' + _r + ',' + _g + ',' + _b + ')';
        },
        norm: function () {
          const v1 = this.Vtxs[0];
          const v2 = this.Vtxs[1];
          const v3 = this.Vtxs[2];
          v3.sub(v2);
          v1.sub(v3);
          v3.cross(v1);
          v3.level();
          return v3;
        },
      }
    );

    Bird.Vtr = Bird.def(
      function (x, y, z) {
        this.x = x || 0;
        this.y = y || 0;
        this.z = z || 0;
        this.fl = 1000;
      },
      {
        Pt: function () {
          const zsc = this.fl + this.z;
          const scale = this.fl / zsc;
          const x = this.x * scale;
          const y = this.y * scale;
          return {
            x: x,
            y: y,
            scale: scale,
          };
        },
        set: function (x, y, z) {
          this.x = x;
          this.y = y;
          this.z = z;
          return this;
        },
        len: function () {
          return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
        },
        add: function (v) {
          this.x += v.x;
          this.y += v.y;
          this.z += v.z;
          return this;
        },
        sub: function (v) {
          this.x -= v.x;
          this.y -= v.y;
          this.z -= v.z;
          return this;
        },
        subv: function (a, b) {
          this.x = a.x - b.x;
          this.y = a.y - b.y;
          this.z = a.z - b.z;
          return this;
        },
        scale: function (upd) {
          this.x *= upd;
          this.y *= upd;
          this.z *= upd;
          return this;
        },
        lowscale: function (upd) {
          if (upd !== 0) {
            const inv = 1 / upd;
            this.x *= inv;
            this.y *= inv;
            this.z *= inv;
          } else {
            this.x = 0;
            this.y = 0;
            this.z = 0;
          }
          return this;
        },
        copy: function (v) {
          if (v) {
            this.x = v.x;
            this.y = v.y;
            this.z = v.z;
            return this;
          }
          return new Bird.Vtr(this.x, this.y, this.z);
        },
        dst: function (v) {
          return Math.sqrt(this.dsq(v));
        },
        dsq: function (v) {
          const dx = this.x - v.x;
          const dy = this.y - v.y;
          const dz = this.z - v.z;
          return dx * dx + dy * dy + dz * dz;
        },
        cross: function (v) {
          const x = this.x,
            y = this.y,
            z = this.z;
          this.x = y * v.z - z * v.y;
          this.y = z * v.x - x * v.z;
          this.z = x * v.y - y * v.x;
          return this;
        },
        p: function (v) {
          return this.x * v.x + this.y * v.y + this.z * v.z;
        },
        level: function () {
          return this.lowscale(this.len());
        },
      }
    );

    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    Bird.$ = canvas.getContext('2d');
    Bird.canv = { w: canvas.width, h: canvas.height };
    Bird.L = new Bird.Vtr(0, 2000, 5000);
    Bird.V = new Bird.Vtr(0, 0, 5000);

    const birds = [];
    const b = [];

    for (let i = 0; i < 100; i++) {
      const _b = (b[i] = new Bird.obj());
      _b.pos.x = Math.random() * 800 - 400;
      _b.pos.y = Math.random() * 800 - 400;
      _b.pos.z = Math.random() * 800 - 400;
      _b.vel.x = Math.random() * 2 - 1;
      _b.vel.y = Math.random() * 2 - 1;
      _b.vel.z = Math.random() * 2 - 1;
      _b._coll(true);
      _b.param(400, 400, 800);

      const bird = (birds[i] = new Bird.Build());
      bird.phase = Math.floor(Math.random() * 62.83);
      bird.pos = b[i].pos;
    }

    let animationFrameId;

    function run() {
      animationFrameId = window.requestAnimationFrame(run);
      draw();
    }

    function draw() {
      Bird.$.setTransform(1, 0, 0, 1, 0, 0);
      Bird.$.translate(Bird.canv.w / 2, Bird.canv.h / 2);
      Bird.$.clearRect(-Bird.canv.w / 2, -Bird.canv.h / 2, Bird.canv.w, Bird.canv.h);
      Bird.$.scale(1, -1);

      const arr = [];
      b.forEach((_b, i) => {
        _b.run(b);
        const bird = birds[i];
        bird.rot.y = Math.atan2(-_b.vel.z, _b.vel.x);
        bird.rot.z = Math.asin(_b.vel.y / _b.vel.len());
        bird.phase = (bird.phase + (Math.max(0, bird.rot.z) + 0.1)) % 62.83;
        bird.wing(Math.sin(bird.phase) * 5);
        bird.matrix();
        arr.push({
          z: bird.zpos(),
          o: bird,
        });
      });
      arr.sort((a, b) => (a.z < b.z ? -1 : a.z > b.z ? 1 : 0));
      arr.forEach((e) => {
        e.o.draw();
      });
    }

    run();

    function handleResize() {
      if (canvas.width !== window.innerWidth || canvas.height !== window.innerHeight) {
        Bird.canv = {
          w: (canvas.width = window.innerWidth),
          h: (canvas.height = window.innerHeight),
        };
      }
    }

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="canv"
      style={{ position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: -1, }}
    />
  );
}

// Default export: Weather component that wraps RealTimeApi and ForeCastAPI
export default function Weather() {
  return (
    <div style={{ padding: '40px'}}>
      <RealTimeApi />
      <hr />
      <ForeCastAPI />
      <hr />
      {/* Bird Animation */}
      <div style={{ position: 'relative', width: '100%', height: '600px', marginTop: '40px' }}>
        <BirdAnimation />
      </div>
    </div>
  );
}

