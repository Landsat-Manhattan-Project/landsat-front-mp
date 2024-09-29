import { useCallback, useState } from "react";

const useAnimations = () => {
  const [zoom, setZoom] = useState<number>(2.5);
  const [backgroundOpacity, setBackgroundOpacity] = useState<number>(1);

  const bgOpacityAnimation = useCallback(
    (
      accBgOpacity: number,
      times: number
    ): { acc: number; reduceOpacity: boolean } => {
      if (accBgOpacity >= 14) {
        return {
          acc: 0,
          reduceOpacity: true,
        };
      }

      if (times >= 3) {
        return {
          acc: accBgOpacity + 1,
          reduceOpacity: true,
        };
      }

      return {
        acc: accBgOpacity,
        reduceOpacity: false,
      };
    },
    []
  );

  const zoomOutAnimation = useCallback(async () => {
    let totalTimes = zoom;

    return new Promise<void>((resolve) => {
      const zoomOut = (times: number) => {
        if (times > 2) {
          setZoom(times - 0.05);
          setTimeout(() => {
            zoomOut(times - 0.05);
          }, 10);
        } else {
          resolve();
        }
      };

      zoomOut(totalTimes);
    });
  }, [zoom, setZoom]);

  const resetZoomOutAnimation = useCallback(() => {
    let totalTimes = 2;

    return new Promise<void>((resolve) => {
      const zoomIn = (times: number) => {
        console.log(times);
        if (times < 2.5) {
          setZoom(times + 0.05);
          setTimeout(() => {
            zoomIn(times + 0.05);
          }, 10);
        } else {
          resolve();
        }
      };

      zoomIn(totalTimes);
    });
  }, [setZoom]);

  const zoomInAnimation = useCallback(async () => {
    let totalTimes = zoom;
    let valueBackgroundOpacity = backgroundOpacity;
    let bgOpacityAcc = 1;

    return new Promise<void>((resolve) => {
      const zoomIn = (times: number, valBgOpacity: number) => {
        if (times < 4.8) {
          const val = bgOpacityAnimation(bgOpacityAcc, times);
          bgOpacityAcc = val.acc;

          setBackgroundOpacity(valBgOpacity);
          setZoom(times + 0.01);
          setTimeout(() => {
            zoomIn(
              times + 0.01,
              valBgOpacity - (val.reduceOpacity ? 0.005 : 0)
            );
          }, 10);
        } else {
          resolve();
        }
      };

      zoomIn(totalTimes, valueBackgroundOpacity);
    });
  }, [zoom, backgroundOpacity, bgOpacityAnimation]);

  return {
    zoom,
    backgroundOpacity,
    zoomInAnimation,
    zoomOutAnimation,
    resetZoomOutAnimation,
  };
};

export { useAnimations };
