import * as React from "react";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Popover from "@mui/material/Popover";
import PopupState, {
  bindTrigger,
  bindPopover,
} from "material-ui-popup-state";

export default function OrderListUpload({
  order_transfer_img,
}) {
  const local = window.location.origin;
  return (
    <PopupState
      variant="popover"
      popupId="demo-popup-popover"
    >
      {(popupState) => (
        <div>
          <Button
            className="btnBuyers"
            {...bindTrigger(popupState)}
          >
            買家匯款明細
          </Button>
          <Popover
            {...bindPopover(popupState)}
            anchorPosition={{
              top: "200",
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <Typography sx={{ p: 1 }}>
              <img
                className="transferImg"
                alt=""
                src={local + order_transfer_img}
              />
            </Typography>
          </Popover>
        </div>
      )}
    </PopupState>
  );
}
