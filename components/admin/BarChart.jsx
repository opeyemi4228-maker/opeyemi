"use client";

// One series of daily counts as thin bars. Single series, so no legend: the
// card title names it. Bars are anchored to the baseline with a rounded top,
// a 2px surface gap between neighbours, and a recessive grid. Hovering (or
// focusing) any day shows its exact count; a visually hidden table carries
// the same numbers for screen readers.

import React from "react";
import { cn } from "@/lib/utils";

const H = 160; // plot height in px
const fmt = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short", timeZone: "UTC" });
const fmtLong = new Intl.DateTimeFormat("en-GB", { weekday: "short", day: "numeric", month: "short", timeZone: "UTC" });

function niceMax(max) {
  if (max <= 4) return 4;
  const pow = 10 ** Math.floor(Math.log10(max));
  const step = [1, 2, 2.5, 5, 10].find((m) => m * pow * 4 >= max) * pow;
  return step * 4;
}

export default function BarChart({ data, label, unit, color = "var(--color-ink)" }) {
  const [hover, setHover] = React.useState(null);
  const max = niceMax(Math.max(0, ...data.map((d) => d.value)));
  const ticks = [0, max / 4, max / 2, (3 * max) / 4, max];
  const total = data.reduce((a, d) => a + d.value, 0);
  const active = hover === null ? null : data[hover];

  return (
    <figure className="m-0">
      <div className="relative flex gap-3">
        {/* y-axis labels */}
        <div aria-hidden="true" className="numeric relative w-8 shrink-0 text-right text-[11px] text-slate" style={{ height: H }}>
          {ticks.map((t) => (
            <span key={t} className="absolute right-0 -translate-y-1/2" style={{ top: H - (t / max) * H }}>
              {Number.isInteger(t) ? t : ""}
            </span>
          ))}
        </div>

        <div className="relative min-w-0 flex-1" onMouseLeave={() => setHover(null)}>
          {/* grid */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0" style={{ height: H }}>
            {ticks.map((t) => (
              <div
                key={t}
                className={cn("absolute inset-x-0 border-t", t === 0 ? "border-graphite/40" : "border-hairline/70")}
                style={{ top: H - (t / max) * H }}
              />
            ))}
          </div>

          {/* bars — each column is the hit target, wider than the mark */}
          <div aria-hidden="true" className="relative flex items-end" style={{ height: H }}>
            {data.map((d, i) => {
              const h = d.value === 0 ? 0 : Math.max(3, (d.value / max) * H);
              return (
                <div
                  key={d.day}
                  onMouseEnter={() => setHover(i)}
                  className="flex h-full flex-1 items-end justify-center px-px"
                >
                  <div
                    className={cn("w-full max-w-4 rounded-t-[4px] transition-opacity", hover !== null && hover !== i && "opacity-40")}
                    style={{ height: h, background: color }}
                  />
                </div>
              );
            })}
          </div>

          {/* tooltip */}
          {active && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-2 z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-lg border border-hairline bg-paper px-3 py-2 text-xs shadow-lg"
              style={{ left: `${((hover + 0.5) / data.length) * 100}%` }}
            >
              <p className="text-slate">{fmtLong.format(new Date(`${active.day}T00:00:00Z`))}</p>
              <p className="numeric mt-0.5 font-semibold text-ink">
                {active.value} {active.value === 1 ? unit : `${unit}s`}
              </p>
            </div>
          )}

          {/* x-axis: first, middle, last */}
          <div aria-hidden="true" className="mt-2 flex justify-between text-[11px] text-slate">
            <span>{fmt.format(new Date(`${data[0].day}T00:00:00Z`))}</span>
            <span>{fmt.format(new Date(`${data[Math.floor(data.length / 2)].day}T00:00:00Z`))}</span>
            <span>Today</span>
          </div>
        </div>
      </div>

      <figcaption className="sr-only">
        {label}: {total} in the last {data.length} days.
      </figcaption>
      {/* sr-only goes on a wrapper: a <table> ignores the 1px height sr-only
          sets and would stretch the page by its full rendered height. */}
      <div className="sr-only">
      <table>
        <caption>{label}, by day</caption>
        <thead>
          <tr>
            <th scope="col">Day</th>
            <th scope="col">Count</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d) => (
            <tr key={d.day}>
              <td>{d.day}</td>
              <td>{d.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </figure>
  );
}
