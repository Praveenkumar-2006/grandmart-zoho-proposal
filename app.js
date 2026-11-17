/**
 * GrandMart Retail Operating System - Interactive Scripts
 * Provides scenario modeling switching, benefit filter toggling, and clean scroll spy.
 */

// ROI Scenario Data Model (Matches Slide 10 exact figures)
const scenarios = {
  conservative: {
    yr1Net: "-₹32.0 L",
    yr1Desc: "Benefits degraded by -30% during pilot rollout",
    yr2Net: "+₹36.0 L",
    yr2Desc: "Run rate net cash flow at -30% realization",
    roi: "~17%",
    payback: "~23 months",
    rowId: "row-conservative"
  },
  base: {
    yr1Net: "-₹4.0 L",
    yr1Desc: "60% benefits realised during rollout year",
    yr2Net: "+₹82.0 L",
    yr2Desc: "Full ₹153L benefit minus ₹71L steady cost",
    roi: "~67%",
    payback: "~13 months",
    rowId: "row-base"
  },
  optimistic: {
    yr1Net: "+₹23.0 L",
    yr1Desc: "Accelerated adoption and faster inventory shrink cuts",
    yr2Net: "+₹128.0 L",
    yr2Desc: "Benefits accelerated by +30% across both branches",
    roi: "~118%",
    payback: "Within Year 1",
    rowId: "row-optimistic"
  }
};

function selectScenario(type, btnElement) {
  // Update button active state
  document.querySelectorAll('.scen-btn').forEach(btn => btn.classList.remove('active'));
  if (btnElement) {
    btnElement.classList.add('active');
  }

  // Update dynamic values
  const data = scenarios[type];
  if (!data) return;

  document.getElementById('scenYr1Net').textContent = data.yr1Net;
  document.getElementById('scenYr1Desc').textContent = data.yr1Desc;
  document.getElementById('scenYr2Net').textContent = data.yr2Net;
  document.getElementById('scenYr2Desc').textContent = data.yr2Desc;
  document.getElementById('scenRoi').textContent = data.roi;
  document.getElementById('scenPayback').textContent = data.payback;

  // Highlight corresponding row in table
  document.querySelectorAll('.scen-row').forEach(row => row.classList.remove('highlight-row'));
  const targetRow = document.getElementById(data.rowId);
  if (targetRow) {
    targetRow.classList.add('highlight-row');
  }
}

// Benefit Classification Filter (Matches Slide 9 breakdown)
function filterBenefits(category, btnElement) {
  // Update button active state
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  if (btnElement) {
    btnElement.classList.add('active');
  }

  const rows = document.querySelectorAll('#benefitsTable tbody tr');
  rows.forEach(row => {
    const type = row.getAttribute('data-type');
    if (category === 'all') {
      row.style.display = '';
    } else if (category === type) {
      row.style.display = '';
    } else {
      row.style.display = 'none';
    }
  });
}

// Navigation active state updater on scroll
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.content-block, .hero-section');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === `#${currentId}`) {
        link.style.color = 'var(--text-main)';
        link.style.fontWeight = '700';
      } else {
        link.style.fontWeight = '600';
      }
    });
  });
});
