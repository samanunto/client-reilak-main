import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { messageBirthdayStartLoading } from "../../actions/cumpleaños";
import moment from "moment";

export const MyBirthday = () => {
  const [accordion, setAccordion] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(messageBirthdayStartLoading());
  }, [dispatch]);
  const { message } = useSelector((state) => state.birthday);
  console.log(message);

  const datecompare = message.map((message) =>
    moment(message.fecha).format("DD-MM-YYYY")
  );
  console.log(datecompare);
  console.log(moment(new Date()).format("DD-MM-YYYY"));

  return (
    <div className="mybirthday">
      {datecompare.includes(moment(new Date()).format("DD-MM-YYYY")) && (
        <div>
          <div
            className="mybirthday__heard"
            onClick={() => setAccordion(!accordion)}
          >
            <img src="https://static.xx.fbcdn.net/rsrc.php/v3/yA/r/hq-o6A7TPpe.png?_nc_eui2=AeGGU6A8aXOypIv04S6g_xh1IDgIyy_WVG8gOAjLL9ZUb6p6DkCMUcdiSXRkwm5okpLKOc7SM8byc76OqjwogCUI" />
            <span>
              Los siguientes miembros te dedicaron un mensaje por tu cumpleaños{" "}
              {accordion ? (
                <i class="fas fa-chevron-down"></i>
              ) : (
                <i class="fas fa-chevron-right"></i>
              )}
            </span>
          </div>
          {accordion && (
            <div className="mybirthday__body">
              {message.map(({ message, userFelicitador, fecha }, i) => (
                <div className="mybirthday__body-item">
                  <div className="mybirthday__body-item-top">
                    <div className="mybirthday__body-item-top-left">
                      <img src={userFelicitador.imgusuario} />
                    </div>
                    <div className="mybirthday__body-item-top-right">
                      <div className="mybirthday__body-item-top-right-name">
                        {userFelicitador.name} {userFelicitador.segundoNombre}{" "}
                        {userFelicitador.apellidoPaterno}{" "}
                        {userFelicitador.apellidoMaterno}
                      </div>
                      <div className="mybirthday__body-item-top-right-time">
                        {moment(fecha).format("DD-MM-YYYY, h:mm a")}
                      </div>
                    </div>
                  </div>
                  <div className="mybirthday__body-item-bottom">{message}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
