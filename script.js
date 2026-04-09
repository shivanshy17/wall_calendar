(function () {
    const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const QUOTES = [
      "“The secret of getting ahead is getting started.” – Mark Twain",
      "“It always seems impossible until it's done.” – Nelson Mandela",
      "“Don't watch the clock; do what it does. Keep going.” – Sam Levenson",
      "“Believe you can and you're halfway there.” – Theodore Roosevelt",
      "“Act as if what you do makes a difference. It does.” – William James",
      "“Success is not final, failure is not fatal: it is the courage to continue that counts.” – Winston Churchill",
      "“You are never too old to set another goal or to dream a new dream.” – C.S. Lewis",
      "“You don't have to be great to start, but you have to start to be great.” – Zig Ziglar",
      "“Opportunities don't happen, you create them.” – Chris Grosser",
      "“The only way to do great work is to love what you do.” – Steve Jobs",
      "“If you can dream it, you can do it.” – Walt Disney",
      "“Make each day your masterpiece.” – John Wooden"
    ];
    const THEMES = [
      { name: "Alpine", brand: "#1a6ec4", brand2: "#2d84e8", accent: "rgba(26,110,196,0.13)", wall: "#cec5b8", img: "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?w=800&q=80" },
      { name: "Forest", brand: "#256b3a", brand2: "#2e8b4a", accent: "rgba(37,107,58,0.13)", wall: "#b8c4b0", img: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&q=80" },
      { name: "Desert", brand: "#b35c1a", brand2: "#d06e22", accent: "rgba(179,92,26,0.13)", wall: "#c8b89a", img: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80" },
      { name: "Ocean", brand: "#0e7490", brand2: "#0891b2", accent: "rgba(14,116,144,0.13)", wall: "#a8bec8", img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80" },
      { name: "Dusk", brand: "#7c3aed", brand2: "#8b5cf6", accent: "rgba(124,58,237,0.13)", wall: "#b8aac8", img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&q=80" },
    ];
    const MONTH_IMGS = [
      "https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?w=800&q=80",
      "https://images.unsplash.com/photo-1516912481808-3406841bd33c?w=800&q=80",
      "https://images.unsplash.com/photo-1490750967868-88df5691cc45?w=800&q=80",
      "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=800&q=80",
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&q=80",
      "https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=800&q=80",
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=800&q=80",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?w=800&q=80",
      "https://images.unsplash.com/photo-1445307806294-bff7f67ff225?w=800&q=80",
      "https://images.unsplash.com/photo-1418985991508-e47386d96a71?w=800&q=80",
    ];
    const HOLIDAYS_DATA = {
      "1-1": "New Year's Day", "1-14": "Makar Sankranti", "1-26": "Republic Day",
      "3-25": "Holi", "4-14": "Dr. Ambedkar Jayanti", "4-18": "Good Friday",
      "5-1": "Labour Day", "8-15": "Independence Day", "8-27": "Janmashtami",
      "10-2": "Gandhi Jayanti", "10-2": "Dussehra", "11-1": "Diwali",
      "12-25": "Christmas"
    };

    const today = new Date();
    let year = today.getFullYear(), month = today.getMonth();
    let rangeStart = null;
    let rangeEnd = null;
    let hoverDate = null;
    let notes = {};
    let activeTheme = null;
    let animKey = 0;

    const grid = document.getElementById("grid");
    const heroImg = document.getElementById("heroImg");
    const monthLabel = document.getElementById("monthLabel");
    const yearLabel = document.getElementById("yearLabel");
    const navTitle = document.getElementById("navTitle");
    const rangeLabel = document.getElementById("rangeLabel");
    const noteInput = document.getElementById("noteInput");
    const saveBtn = document.getElementById("saveBtn");
    const legendRow = document.getElementById("legendRow");
    const themeBar = document.getElementById("themeBar");
    const strip = document.getElementById("strip");
    const flipBtn = document.getElementById("flipBtn");
    const noteLines = document.getElementById("noteLines");
    const darkModeBtn = document.getElementById("darkModeBtn");

    let isDarkMode = false;
    darkModeBtn.onclick = () => {
      isDarkMode = !isDarkMode;
      if (isDarkMode) {
        document.body.setAttribute("data-theme", "dark");
        darkModeBtn.textContent = "Light Mode";
      } else {
        document.body.removeAttribute("data-theme");
        darkModeBtn.textContent = "Dark Mode";
      }
    };

    function buildCoils() {
      strip.innerHTML = "";
      const n = Math.max(8, Math.floor(strip.offsetWidth / 24));
      for (let i = 0; i < n; i++) { const c = document.createElement("div"); c.className = "coil"; strip.appendChild(c); }
    }

    function buildNoteLines() {
      noteLines.innerHTML = "";
      for (let i = 0; i < 5; i++) {
        const l = document.createElement("div"); l.className = "note-line";
        l.style.top = (24 + i * 21) + "px"; noteLines.appendChild(l);
      }
    }

    function buildThemeBar() {
      themeBar.innerHTML = "";
      THEMES.forEach((t, i) => {
        const b = document.createElement("button");
        b.className = "t-btn" + (activeTheme === i ? " active" : "");
        b.textContent = t.name;
        b.onclick = () => { activeTheme = (activeTheme === i ? null : i); applyTheme(); buildThemeBar(); };
        themeBar.appendChild(b);
      });
    }

    function applyTheme() {
      const root = document.documentElement;
      const t = activeTheme !== null ? THEMES[activeTheme] : null;
      root.style.setProperty("--brand", t ? t.brand : "#1a6ec4");
      root.style.setProperty("--brand2", t ? t.brand2 : "#2d84e8");
      root.style.setProperty("--range-end", t ? t.brand : "#1a6ec4");
      root.style.setProperty("--range-bg", t ? t.accent : "rgba(26,110,196,0.13)");
      root.style.setProperty("--today-ring", t ? t.brand : "#1a6ec4");
      document.querySelector(".month-badge").style.background = t ? t.brand : "#1a6ec4";
      document.querySelectorAll(".month-badge svg polygon").forEach((p, i) => {
        if (i === 0) p.setAttribute("fill", t ? t.brand : "#1a6ec4");
      });
      const img = t ? t.img : MONTH_IMGS[month];
      loadHeroImg(img);
    }

    function loadHeroImg(src) {
      heroImg.classList.remove("loaded");
      heroImg.src = src;
      heroImg.onload = () => heroImg.classList.add("loaded");
    }

    function getWeekNum(d) {
      const jan1 = new Date(d.getFullYear(), 0, 1);
      return Math.ceil(((d - jan1) / 86400000 + jan1.getDay() + 1) / 7);
    }

    function daysInMonth(y, m) { return new Date(y, m + 1, 0).getDate(); }
    function firstDow(y, m) { let d = new Date(y, m, 1).getDay(); return d === 0 ? 6 : d - 1; }

    function isSame(a, b) { return a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }
    function isBetween(d, s, e) { if (!s || !e) return false; const [lo, hi] = s <= e ? [s, e] : [e, s]; return d > lo && d < hi; }
    function noteKey(d) { return d ? `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}` : `${year}-${month + 1}-gen`; }

    function rangeStr() {
      if (rangeStart && rangeEnd) {
        let s = rangeStart <= rangeEnd ? rangeStart : rangeEnd;
        let e = rangeStart <= rangeEnd ? rangeEnd : rangeStart;
        if (s.getMonth() === e.getMonth()) return `${s.getDate()} - ${e.getDate()} ${MONTHS[s.getMonth()]}`;
        return `${s.getDate()} ${MONTHS[s.getMonth()].substring(0,3)} - ${e.getDate()} ${MONTHS[e.getMonth()].substring(0,3)}`;
      }
      if (rangeStart) return `${rangeStart.getDate()} ${MONTHS[month]} - ...`;
      return "Click a day to select";
    }

    function render() {
      const tooltipEl = document.getElementById("calendarTooltip");
      if (tooltipEl) tooltipEl.classList.remove("visible");

      animKey++;
      const dim = daysInMonth(year, month);
      const fd = firstDow(year, month);
      monthLabel.textContent = MONTHS[month].toUpperCase();
      yearLabel.textContent = year;
      navTitle.textContent = `${MONTHS[month]} ${year}`;
      rangeLabel.textContent = rangeStr();

      if (activeTheme === null) loadHeroImg(MONTH_IMGS[month]);

      const rows = [];
      let cells = [];
      let dayCount = 0;
      for (let i = 0; i < fd; i++)cells.push(null);
      for (let d = 1; d <= dim; d++) { cells.push(d); dayCount++; }
      while (cells.length % 7 !== 0) cells.push(null);

      grid.innerHTML = "";
      grid.style.animation = "none";
      setTimeout(() => grid.style.animation = "", 10);

      for (let r = 0; r < cells.length / 7; r++) {
        const rowCells = cells.slice(r * 7, (r + 1) * 7);
        const firstReal = rowCells.find(x => x !== null);
        const wkDate = firstReal ? new Date(year, month, firstReal) : null;
        const wkNum = wkDate ? getWeekNum(wkDate) : "";
        const wkEl = document.createElement("div");
        wkEl.className = "wk-num"; wkEl.textContent = wkNum || "";
        grid.appendChild(wkEl);
        rowCells.forEach((d, ci) => {
          const el = document.createElement("div");
          if (!d) { el.className = "day empty"; grid.appendChild(el); return; }
          const date = new Date(year, month, d);
          el.dataset.date = date.getTime();
          const isToday = isSame(date, today);
          const dow = ci;
          const isWknd = dow >= 4;
          const hk = `${month + 1}-${d}`;
          const isHoliday = !!HOLIDAYS_DATA[hk];
          
          let noteObj = null;
          const qDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
          for (let k in notes) {
            if (k.startsWith(qDate + "_to_") || k === qDate) {
              noteObj = { key: k, text: notes[k] };
              break;
            }
          }
          const hasNote = !!(noteObj && noteObj.text.trim());
          const isStart = isSame(date, rangeStart);
          const isEnd = isSame(date, rangeEnd);
          
          let cls = "day";
          if (isWknd && !isHoliday) cls += " wknd";
          if (isHoliday) cls += " holiday holiday-dot";
          if (isToday) cls += " today";
          
          const sDate = rangeStart && rangeEnd && rangeStart > rangeEnd ? rangeEnd : rangeStart;
          const eDate = rangeStart && rangeEnd && rangeStart > rangeEnd ? rangeStart : rangeEnd;
          
          if (rangeStart && rangeEnd && isBetween(date, sDate, eDate)) {
             cls += " range-in";
          }
          if (isStart || isEnd) {
             cls += " range-start";
             if (isStart && isEnd) cls += " also-end";
             else if (isEnd) cls += " range-end";
          }

          if (hasNote) cls += " has-note";
          el.className = cls;
          el.textContent = d;
          
          el.onmouseenter = (e) => {
            if (rangeStart && !rangeEnd) {
              hoverDate = date;
              updateHoverClasses();
            }
            if (hasNote) {
              const tooltipEl = document.getElementById("calendarTooltip");
              if (!tooltipEl) return;
              const lines = noteObj.text.split('\n').map(t=>t.trim()).filter(t=>t);
              let listHtml = "";
              lines.forEach(l => { listHtml += `<li>${l}</li>`; });
              let rangeText = "Tasks and Notes:";
              const parts = noteObj.key.split("_to_");
              if (parts.length === 2 && parts[0] !== parts[1]) {
                rangeText = `Tasks from ${parts[0]} to ${parts[1]}:`;
              }
              tooltipEl.innerHTML = `<div class="tt-title">${rangeText}</div><ul class="tt-list">${listHtml}</ul>`;
              tooltipEl.classList.add("visible");
              tooltipEl.style.left = (e.pageX + 15) + "px";
              tooltipEl.style.top = (e.pageY + 15) + "px";
            }
          };
          el.onmousemove = (e) => {
            const tooltipEl = document.getElementById("calendarTooltip");
            if (tooltipEl && tooltipEl.classList.contains("visible")) {
              tooltipEl.style.left = (e.pageX + 15) + "px";
              tooltipEl.style.top = (e.pageY + 15) + "px";
            }
          };
          el.onmouseleave = () => {
            const tooltipEl = document.getElementById("calendarTooltip");
            if (tooltipEl) tooltipEl.classList.remove("visible");
          };

          el.onclick = () => handleDay(d);
          grid.appendChild(el);
        });
      }

      legendRow.innerHTML = "";
      Object.entries(HOLIDAYS_DATA).forEach(([k, v]) => {
        const [m2] = k.split("-").map(Number);
        if (m2 === month + 1) {
          const chip = document.createElement("div"); chip.className = "legend-chip";
          chip.textContent = `${k.split("-")[1]} · ${v}`; legendRow.appendChild(chip);
        }
      });

      let nk = `${year}-${month + 1}-gen`;
      if (rangeStart && rangeEnd) {
         const s = rangeStart < rangeEnd ? rangeStart : rangeEnd;
         const e = rangeStart < rangeEnd ? rangeEnd : rangeStart;
         nk = `${s.getFullYear()}-${s.getMonth()+1}-${s.getDate()}_to_${e.getFullYear()}-${e.getMonth()+1}-${e.getDate()}`;
      } else if (rangeStart) {
         nk = `${rangeStart.getFullYear()}-${rangeStart.getMonth()+1}-${rangeStart.getDate()}_to_${rangeStart.getFullYear()}-${rangeStart.getMonth()+1}-${rangeStart.getDate()}`;
      }
      
      let noteObjVal = "";
      if (rangeStart) {
         const qDate = `${rangeStart.getFullYear()}-${rangeStart.getMonth() + 1}-${rangeStart.getDate()}`;
         for (let k in notes) {
            if (k.startsWith(qDate + "_to_") || k === qDate) {
               noteObjVal = notes[k];
               nk = k;
               break;
            }
         }
      } else {
         noteObjVal = notes[nk] || "";
      }

      noteInput.dataset.key = nk;
      noteInput.value = noteObjVal;
      saveBtn.className = "save-btn";
      saveBtn.textContent = "Save Note";

      const qt = document.getElementById("quoteText");
      if (qt) qt.textContent = QUOTES[month % QUOTES.length];
    }

    function updateHoverClasses() {
      if (!rangeStart || rangeEnd) return;
      const sTime = rangeStart.getTime();
      const hTime = hoverDate ? hoverDate.getTime() : sTime;
      const lo = Math.min(sTime, hTime);
      const hi = Math.max(sTime, hTime);
      
      document.querySelectorAll('#grid .day').forEach(el => {
        if (el.classList.contains('empty')) return;
        const dTime = parseInt(el.dataset.date, 10);
        if (dTime === sTime) return;
        if (dTime > lo && dTime < hi) {
           el.classList.add('range-hover');
        } else if (dTime === hTime && dTime !== sTime) {
           el.classList.add('range-hover');
        } else {
           el.classList.remove('range-hover');
        }
      });
    }

    function handleDay(d) {
      const clicked = new Date(year, month, d);
      if (!rangeStart || (rangeStart && rangeEnd)) {
        rangeStart = clicked;
        rangeEnd = null;
        hoverDate = null;
      } else {
        if (isSame(clicked, rangeStart)) {
          rangeStart = null;
        } else {
          rangeEnd = clicked;
        }
        hoverDate = null;
      }
      render();
    }

    function changeMonth(delta) {
      const wrapper = document.getElementById("pageWrapper");
      const cal = document.getElementById("cal");
      if (!wrapper) return;
      const clone = wrapper.cloneNode(true);
      clone.querySelectorAll('*').forEach(el => el.removeAttribute('id'));
      clone.removeAttribute('id');
      clone.style.position = "absolute";
      clone.style.top = wrapper.offsetTop + "px";
      clone.style.left = "0";
      clone.style.width = "100%";
      clone.style.transformOrigin = "top center";
      clone.style.height = wrapper.offsetHeight + "px";
      clone.style.overflow = "hidden";
      cal.appendChild(clone);

      month += delta;
      if (month > 11) { month = 0; year++; }
      else if (month < 0) { month = 11; year--; }
      rangeStart = null;

      if (delta > 0) {
        clone.style.zIndex = "10";
        render();
        clone.style.animation = "pageTurnUp 0.45s cubic-bezier(0.4, 0, 0.2, 1) forwards";
        setTimeout(() => { if (cal.contains(clone)) clone.remove(); }, 450);
      } else {
        clone.style.zIndex = "1";
        wrapper.style.zIndex = "10";
        render();
        wrapper.style.animation = "none";
        wrapper.offsetHeight; /* force reflow */
        wrapper.style.animation = "pageTurnDown 0.45s cubic-bezier(0.4, 0, 0.2, 1) forwards";
        setTimeout(() => {
          if (cal.contains(clone)) clone.remove();
          wrapper.style.animation = "";
          wrapper.style.zIndex = "";
        }, 450);
      }
    }

    document.getElementById("prevBtn").onclick = () => changeMonth(-1);
    document.getElementById("nextBtn").onclick = () => changeMonth(1);
    flipBtn.onclick = () => {
      const cal = document.getElementById("cal");
      cal.style.transition = "transform 0.3s cubic-bezier(0.4,0,0.2,1),box-shadow 0.3s";
      cal.style.transform = "perspective(800px) rotateX(-1.5deg) scaleY(0.98) translateY(-3px)";
      cal.style.boxShadow = "0 2px 0 rgba(255,255,255,0.15),0 40px 80px rgba(0,0,0,0.4)";
      changeMonth(1);
      setTimeout(() => {
        cal.style.transform = "perspective(800px) rotateX(-1.5deg) scaleY(1)";
        cal.style.boxShadow = "0 2px 0 rgba(255,255,255,0.15),0 8px 20px rgba(0,0,0,0.25),0 30px 60px rgba(0,0,0,0.3)";
        setTimeout(() => cal.style.transition = "", 350);
      }, 200);
    };

    saveBtn.onclick = () => {
      const k = noteInput.dataset.key || `${year}-${month + 1}-gen`;
      notes[k] = noteInput.value;
      saveBtn.textContent = "Saved!"; saveBtn.className = "save-btn saved";
      setTimeout(() => { saveBtn.textContent = "Save Note"; saveBtn.className = "save-btn"; }, 2000);
      render();
    };

    buildCoils(); buildNoteLines(); buildThemeBar(); render();
    window.addEventListener("resize", buildCoils);
  })();