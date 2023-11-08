'use client';
import React from 'react';
import {Box, Button} from "@radix-ui/themes";
import {ChevronLeftIcon, ChevronRightIcon, DoubleArrowLeftIcon, DoubleArrowRightIcon} from "@radix-ui/react-icons";
import {useRouter, useSearchParams} from "next/navigation";

interface Props {
    itemCount: number;          // how many total items are being paginated
    pageSize: number;           // how many items are on each page
    currentPage: number;        // current page number
    maxPageButtons?: number;    // how many numbered page buttons to display
}

const Pagination = ({itemCount, pageSize, currentPage, maxPageButtons}: Props) => {

    const router = useRouter();
    const searchParams = useSearchParams();

    const activeButtonColor = 'blue';
    const inactiveButtonColor = 'gray';
    const activeButtonVariant = 'surface';
    const inactiveButtonVariant = 'surface';

    const pageCount = Math.ceil(itemCount / pageSize);
    if (pageCount === 1) return null;

    const maxPageButtonCount = maxPageButtons ? maxPageButtons : 5;

    // adjust start position so that the current page is in the middle of the array
    // if the array is less than maxPageButtonCount, then the start position is always 1
    // if the array is maxPageButtonCount or more, then the start position
    // is the current page minus half the array width.
    // if the start position is less than 1, then the start position is 1
    // if the start position plus the array width is greater than the page count,
    // then the start position is the page count minus the array width plus 1
    // will always display maxPageButtonCount or fewer pages - and not exceed the page count

    const arrayWidth = (pageCount < maxPageButtonCount) ? pageCount : maxPageButtonCount;

    let startPage = (currentPage - Math.floor(arrayWidth / 2) < 1)
        ? 1
        : currentPage - Math.floor(arrayWidth / 2);

    startPage = (currentPage + Math.ceil(arrayWidth / 2) > pageCount)
        ? pageCount - arrayWidth + 1
        : startPage;

    // No more calculations - let's create the component

    const changePage = (page: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', page.toString());
        router.push("?" + params.toString());
    };

    return (
        <div>
            {/*Create << when not on first page*/}
            {currentPage !== 1 &&
                // Created << when not on first page
                <Button color={inactiveButtonColor} variant={inactiveButtonVariant}
                        onClick={() => changePage(1)}>
                    <DoubleArrowLeftIcon/>
                </Button>}

            {/*Create < when not on first page*/}
            {currentPage !== 1 &&
                <Button color={inactiveButtonColor} variant={inactiveButtonVariant}
                        onClick={() => changePage(currentPage - 1)}>
                    <ChevronLeftIcon/>
                </Button>}

            {/*Create calculated numbered buttons */}
            {
                Array(arrayWidth).fill(startPage).map((_, index) => {
                    const pageNumber = startPage + index;
                    return (
                        <Button
                            onClick={() => changePage(pageNumber)}
                            key={index}
                            variant={pageNumber === currentPage
                                ? activeButtonVariant : inactiveButtonVariant}
                            color={pageNumber === currentPage
                                ? activeButtonColor : inactiveButtonColor}>
                            <Box width="5"
                                 className={pageNumber === currentPage
                                     ? 'font-bold text-center'
                                     : 'text-center'}>
                                {pageNumber}
                            </Box>
                        </Button>
                    );
                })
            }

            {/*Create > when not on last page*/}
            {currentPage !== pageCount &&
                <Button color={inactiveButtonColor} variant={inactiveButtonVariant}
                        onClick={() => changePage(currentPage + 1)}>
                    <ChevronRightIcon/>
                </Button>}

            {/*Create >> when not on last page*/}
            {currentPage !== pageCount &&
                <Button color={inactiveButtonColor} variant={inactiveButtonVariant}
                        onClick={() => changePage(pageCount)}>
                    <DoubleArrowRightIcon/>
                </Button>}
        </div>
    );
};

export default Pagination;
