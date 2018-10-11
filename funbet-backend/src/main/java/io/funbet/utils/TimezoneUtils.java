package io.funbet.utils;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

public class TimezoneUtils
{
    public static LocalDateTime convertLocalDateTime(LocalDateTime dt, String fromTz, String toTz)
    {
        ZonedDateTime zonedTimestamp = dt.atZone(ZoneId.of(fromTz));
        ZonedDateTime toTzTimestamp = zonedTimestamp.withZoneSameInstant(ZoneId.of(toTz));
        return  toTzTimestamp.toLocalDateTime();
    }

    public static LocalDateTime convertLocalDateTimeToSystemTz(LocalDateTime dt, String fromTz)
    {
        return convertLocalDateTime(dt, fromTz, ZoneId.systemDefault().getId());
    }
}
