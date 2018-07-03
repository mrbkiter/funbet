package io.funbet.type;

import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.usertype.UserType;

import java.io.Serializable;
import java.sql.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

// hibernate does not support postgres array types OOTB, note columnDefinition="smallint[]" must
// be included in the annotation or it will not work.
public class IntArrayType implements UserType {
    public static final String TYPE_NAME = "int-array";

    private final int[] arrayTypes = new int[]{Types.ARRAY};

    public int[] sqlTypes() {
        return arrayTypes;
    }

    public Class<List> returnedClass() {
        return List.class;
    }

    public boolean equals(Object x, Object y) throws HibernateException {
        return x == null ? y == null : x.equals(y);
    }

    public int hashCode(Object x) throws HibernateException {
        return x == null ? 0 : x.hashCode();
    }

    public Object nullSafeGet(ResultSet rs, String[] names, SharedSessionContractImplementor session, Object owner)
            throws HibernateException, SQLException {
        if (names != null && names.length > 0 && rs != null && rs.getArray(names[0]) != null) {
            // weirdness causing either hibernate or postgres jdbc driver to cause both short and
            // integer types to return.. no idea. Even odder after changing a smallint array from
            // {0,1,2} to {0,1,2,4,5} it switch from Integer to Short.
            Object array = rs.getArray(names[0]).getArray();
            if (array instanceof Integer[])
                return Arrays.asList((Integer[]) array);
            else
                return Arrays.asList(convertShortArrayToInt((Short[]) array));
        }

        return null;
    }

    private Integer[] convertShortArrayToInt(Short[] array) {
        Integer[] intArray = new Integer[array.length];
        for (int i = 0; i < array.length; i++)
            intArray[i] = Integer.valueOf(array[i]);

        return intArray;
    }

    public void nullSafeSet(PreparedStatement st, Object value, int index, SharedSessionContractImplementor session)
            throws HibernateException, SQLException {
        if (value != null && st != null) {
            List<Integer> list = (List<Integer>) value;
            Integer[] castObject = list.toArray(new Integer[list.size()]);
            Array array = session.connection().createArrayOf("smallint", castObject);
            st.setArray(index, array);
        } else {
            st.setNull(index, arrayTypes[0]);
        }
    }

    public Object deepCopy(Object value) throws HibernateException {
        if (value == null)
            return null;

        List<Integer> list = (List<Integer>) value;
        ArrayList<Integer> clone = new ArrayList<Integer>();
        for (Object intOn : list)
            clone.add((Integer) intOn);

        return clone;
    }

    public boolean isMutable() {
        return false;
    }

    public Serializable disassemble(Object value) throws HibernateException {
        return (Serializable) value;
    }

    public Object assemble(Serializable cached, Object owner) throws HibernateException {
        return cached;
    }

    public Object replace(Object original, Object target, Object owner) throws HibernateException {
        return original;
    }
}