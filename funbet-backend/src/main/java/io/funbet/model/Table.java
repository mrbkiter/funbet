package io.funbet.model;

import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
public class Table
{
    List<Object> headers = new ArrayList<>();

    Object[][] rows;

    public Table(int headCount, int rowCount)
    {
        rows = new Object[rowCount][headCount];
        /*for(int ridx=0; ridx < rowCount; ridx++)
        {
            rows[ridx] = (R[]) new Object[headCount];
        }*/
    }

    public void setElement(Integer rowIdx, Integer headerIdx, Object ele)
    {
        rows[rowIdx][headerIdx] = ele;
    }
}
